import boto3
import botocore
import datetime
import hashlib
import json
import logging
import mimetypes
import os
import shutil
import subprocess
import sys
import tempfile
import time


def strip_output(output):
    return str(output, "utf-8").strip()


def build_web_app(app_name, public_url, app_env, is_adhoc, is_codebuild, is_cn, with_env={}):
    env = os.environ.copy()
    env.update(with_env)
    output_suffix = "adhoc"

    # Version code is number of minutes since 1/1/2018.
    version_code = int((time.time() - 1514764800) / 60)

    if not is_adhoc:
        if not is_codebuild:
            if subprocess.call(["git", "fetch"]) != 0:
                logging.error("Failed to fetch.")
                sys.exit(1)

            local_branch = strip_output(subprocess.check_output(["git", "symbolic-ref", "--short", "HEAD"]))
            target_branch = "origin/" + local_branch
            logging.info("Building from %s..." % target_branch)
            if (
                target_branch != "origin/master"
                and target_branch != "origin/release"
                and not target_branch.startswith("origin/release/")
            ):
                logging.error("You can only build from master or release branches.")
                logging.error("To create adhoc build, use ./build --adhoc")
                sys.exit(1)

            modified = subprocess.call(["git", "diff-index", "--quiet", target_branch, "--"])
            untracked = strip_output(subprocess.check_output(["git", "ls-files", "--exclude-standard", "--others"]))

            if modified != 0 or untracked != "":
                logging.error("You can only build without any local changes.")
                logging.error("To create adhoc build, use ./build --adhoc")
                sys.exit(1)

        commit_hash = strip_output(subprocess.check_output(["git", "rev-parse", "--short", "HEAD"]))
        logging.info(f"Creating build using commit: {commit_hash}...")

        app_version = str(version_code) + "." + commit_hash
        env["REACT_APP_COMMIT_HASH"] = app_version
        output_suffix = app_version
    else:
        logging.info("Creating adhoc build...")

        commit_hash = strip_output(subprocess.check_output(["git", "rev-parse", "--short", "HEAD"]))
        app_version = str(version_code) + "." + commit_hash + ".dev"
        env["REACT_APP_COMMIT_HASH"] = app_version

    logging.info(f"Building {app_name} [{public_url}] for {app_env} environment...")

    env["REACT_APP_IS_PROD"] = "1" if app_env == "prod" else "0"
    env["REACT_APP_ENV"] = app_env
    if is_cn:
        env["REACT_APP_REGION"] = "cn"
    else:
        env["REACT_APP_REGION"] = "us"
    env["PUBLIC_URL"] = public_url

    exit_code = subprocess.call(["yarn", "build"], env=env)
    if exit_code != 0:
        logging.error("Build failed.")
        sys.exit(exit_code)

    if not os.path.exists("./out"):
        os.makedirs("./out")

    env_and_region = app_env + "-" + env["REACT_APP_REGION"]

    output_dst = f"./out/{app_name}-{env_and_region}-{output_suffix}.tar"
    subprocess.check_call(["tar", "-C", "./build", "-cf", output_dst, "."])
    subprocess.check_call(["gzip", "-9f", output_dst])

    output_path = f"{output_dst}.gz"
    logging.info(f"Done! {output_path}")

    return output_path


EXT_TO_GZIP = [".css", ".js", ".otf", ".svg", ".html"]
EXT_TO_STRIP_SOURCEMAP = [".css", ".js"]
LAST_FILES = ["service-worker.js", "index.html"]


def copy_to_s3(client, bucket, src_path, dst_path, no_cache, is_gzip):
    content_type, _ = mimetypes.guess_type(dst_path)
    if dst_path.endswith(".wasm"):
        content_type = "application/wasm"

    args = dict()
    args["Bucket"] = bucket
    args["Key"] = dst_path

    if content_type:
        args["ContentType"] = content_type
    if is_gzip:
        args["ContentEncoding"] = "gzip"
    if no_cache:
        args["CacheControl"] = "no-cache,no-store"
        args["Expires"] = "0"

    logging.info(f"Copy {src_path} to {dst_path} as {content_type}...")
    with open(src_path, "rb") as f:
        args["Body"] = f
        client.put_object(**args)


def list_s3_objects(client, bucket, prefix=""):
    logging.debug(f"Listing objects of bucket [{bucket}]...")

    results = {}
    continuation_token = None
    while True:
        resp = (
            client.list_objects_v2(Bucket=bucket, ContinuationToken=continuation_token, Prefix=prefix)
            if continuation_token
            else client.list_objects_v2(Bucket=bucket, Prefix=prefix)
        )

        for c in resp.get("Contents", []):
            key = c["Key"]
            etag = c["ETag"]
            results[key] = etag

        continuation_token = resp.get("NextContinuationToken", None)
        if not continuation_token:
            break

    return results


def can_skip_upload(src_path, dst_path, s3_objects):
    etag = s3_objects.get(dst_path, "")
    if not etag:
        return False

    hasher = hashlib.md5()
    with open(src_path, "rb") as f:
        hasher.update(f.read())

    return hasher.hexdigest() == etag.strip('"')


# We need to generate source map in order to upload to bugsnag for better error tracing.
# However we do not upload source map to s3 bucket.
# The source map URL embedded in source code will trigger browser to download source map files
# when dev tool is opened, which always fails.
def strip_sourcemap_url(path):
    bak_path = path + ".bak"
    shutil.move(path, bak_path)

    with open(bak_path, encoding="utf-8") as src, open(path, mode="w", encoding="utf-8") as out:
        for line in src:
            is_sourcemap_url = (line.startswith("//") or line.startswith("/*")) and "sourceMappingURL=" in line
            if not is_sourcemap_url:
                out.write(line)


## If is_root == True, ignore prefix when invalidating CloudFront.
def deploy_dist_to_s3(dist, bucket, cloudfront_id, force=False, prefix="", is_root=False):
    if bucket.startswith("s3://"):
        bucket = bucket[5:]

    src_prefix_len = len(dist) + 1

    client = boto3.client("s3")

    s3_objects = {}
    if not force:
        s3_objects = list_s3_objects(client, bucket, prefix=prefix)
        logging.info(f"There are {len(s3_objects)} objects in bucket {bucket}.")

    src_files = []
    for cur_dir, _, file_names in os.walk(dist):
        for fn in file_names:
            if cur_dir == dist and fn in LAST_FILES:
                continue

            if fn == ".DS_Store" or fn.endswith(".map"):
                continue

            src_files.append(os.path.join(cur_dir, fn))

    for fn in LAST_FILES:
        src_files.append(os.path.join(dist, fn))

    skip_count = 0
    copy_count = 0

    for path in src_files:
        if not os.path.exists(path):
            continue
        aws_path = path[src_prefix_len:]
        if prefix != "":
            aws_path = os.path.join(prefix, aws_path)
        no_cache = aws_path in LAST_FILES

        _, ext = os.path.splitext(path)

        if ext in EXT_TO_STRIP_SOURCEMAP:
            strip_sourcemap_url(path)

        if ext in EXT_TO_GZIP:
            subprocess.check_call(["gzip", "-9n", path])
            path = path + ".gz"
            if can_skip_upload(path, aws_path, s3_objects):
                skip_count += 1
                continue

            copy_to_s3(client, bucket, path, aws_path, no_cache, True)
            copy_count += 1
        else:
            if can_skip_upload(path, aws_path, s3_objects):
                skip_count += 1
                continue

            copy_to_s3(client, bucket, path, aws_path, no_cache, False)
            copy_count += 1

    if skip_count > 0:
        logging.info(f"Skipped {skip_count} identical files.")

    if copy_count > 0:
        logging.info(f"Invalidating CloudFront {cloudfront_id} ...")

        if prefix == "" or is_root:
            url_prefix = ""
        else:
            url_prefix = "/" + prefix

        inv_items = [
            url_prefix + "/",
            url_prefix + "/asset-manifest.json",
            url_prefix + "/favicon.png",
            url_prefix + "/index.html",
            url_prefix + "/logo-192.png",
            url_prefix + "/logo-512.png",
            url_prefix + "/manifest.json",
            url_prefix + "/service-worker.js",
            url_prefix + "/static/*",
            url_prefix + "/.well-known/*",
            url_prefix + "/oauth_cb.html",
        ]

        if url_prefix != "":
            inv_items.append(url_prefix + "/*")
            inv_items.append(url_prefix)

        inv_batch = {
            "Paths": {
                "Quantity": len(inv_items),
                "Items": inv_items,
            },
            "CallerReference": f"Deployment at {datetime.datetime.utcnow().isoformat('T')}Z",
        }

        env = os.environ.copy()
        env["AWS_MAX_ATTEMPTS"] = "10"
        subprocess.check_call(
            [
                "aws",
                "cloudfront",
                "create-invalidation",
                "--distribution-id",
                cloudfront_id,
                "--invalidation-batch",
                json.dumps(inv_batch),
            ],
            env=env,
        )

    logging.info(f"Deployed to {bucket}/{prefix}")


def deploy_to_s3(app_package, bucket, cloudfront_id, force=False, prefix="", is_root=False):
    tmp_dir = tempfile.mkdtemp("", "tmp-", "./out")

    subprocess.check_call(["tar", "-C", tmp_dir, "-xf", app_package])

    deploy_dist_to_s3(tmp_dir, bucket, cloudfront_id, force=False, prefix=prefix, is_root=is_root)

    shutil.rmtree(tmp_dir)


def upload_bugsnag_map(app_package, public_url, api_key, app_version):
    logging.info(f"Uploading bugsnag mapping file as version {app_version}")
    tmp_dir = tempfile.mkdtemp("", "tmp-", "./out")
    src_prefix_len = len(tmp_dir) + 1

    subprocess.check_call(["tar", "-C", tmp_dir, "-xf", app_package])

    map_files = []
    for cur_dir, _, file_names in os.walk(tmp_dir):
        for fn in file_names:
            if fn.endswith(".js.map"):
                map_files.append(
                    {
                        "src": os.path.join(cur_dir, fn[:-4]),
                        "map": os.path.join(cur_dir, fn),
                    }
                )

    for f in map_files:
        src_path = f["src"]
        map_path = f["map"]
        src_url = public_url + "/" + f["src"][src_prefix_len:]
        subprocess.check_call(
            [
                "yarn",
                "bugsnag-sourcemaps",
                "--api-key",
                api_key,
                "--app-version",
                app_version,
                "--minified-url",
                src_url,
                "--source-map",
                map_path,
                "--minified-file",
                src_path,
                "--overwrite",
            ]
        )

    logging.info("Uploaded to bugsnag")
    shutil.rmtree(tmp_dir)


def set_region_and_profile(args):
    if args.is_codebuild:
        return

    if hasattr(args, "cn") and args.cn:
        os.environ["AWS_DEFAULT_REGION"] = "cn-northwest-1"
        # please set the name of aws China credentials to cn
        os.environ["AWS_PROFILE"] = "cn"

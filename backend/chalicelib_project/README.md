# Vira

Vira is a Slack bot that uses OpenAI's API to generate responses with pre-configured prompts.

Things Vira can help:
- Refine email in different context (marketing, customer support, etc.)
- Refine website copy in different context (ads landing page, product page, etc.)
- Refine UX copy in apps.
- General chats.


## Quick Setup

This project uses Chalice to manage AWS infrasture. You must use a Python version that is
supported by AWS Lambda. Current latest supported version is 3.9.

### Using Miniconda (recommended)

```shell
conda create -n vira python=3.9
conda activate vira
pip install -r dev-requirements.txt -r requirements.txt
```

### Using venv

Make sure the `python3.9` executable is in your PATH.

```shell
python3.9 -m venv venv39
source venv39/bin/activate
pip install -r dev-requirements.txt -r requirements.txt
```

## Deployment

Make sure AWS credentials are properly configured, then.

```shell
chalice deploy
```

This will deploy vira to dev environment and can be accessed by `--dev` command.

To deploy to live (if you have permission):

```shell
chalice deploy --stage live
```

There are AWS resources that are not managed by Chalice. They are managed by terraform.
See details: https://github.com/vibeus/vibe-infra/vira

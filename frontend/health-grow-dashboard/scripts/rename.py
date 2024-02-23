import os
rootDir = "./src/pages/vibeOne"
# rootDir = "./src/components/portal"


def rename(path):
  src = os.path.abspath(path)
  # if ".module.less" in src and ".less" not in src:
  #   split_arr = src.split(".module.less", 1)
  #   dst = split_arr[0] + '.less'
  if ".less" in src and not ".module.less" in src:
    split_arr = src.split(".less", 1)
    dst = split_arr[0]
    os.rename(src, dst)

def loopRenameStyleModule(rootDir):
  if (os.path.isfile(rootDir)):
    rename(rootDir)
  else:
    for filename in os.listdir(rootDir):
      pathname = os.path.join(rootDir, filename)
      loopRenameStyleModule(pathname)
    


if __name__ == "__main__":
    loopRenameStyleModule(rootDir)


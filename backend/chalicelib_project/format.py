import os
import black

current_dir = os.getcwd()

ignore_dirs = ["venv", "__pycache__"]

for root, dirs, files in os.walk(current_dir):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]

    for file in files:
        if file.endswith(".py"):
            file_path = os.path.join(root, file)

            try:
                with open(file_path, "r") as f:
                    code = f.read()

                # 格式化代码
                formatted_code = black.format_str(code, mode=black.FileMode())

                # 将格式化后的代码写回文件
                with open(file_path, "w") as f:
                    f.write(formatted_code)

                print(f"Formatted file: {file_path}")
            except Exception as e:
                print(f"Failed to format file: {file_path}")
                print(f"Error: {str(e)}")

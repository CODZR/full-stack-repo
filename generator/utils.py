import datetime
import hashlib


# 自定义一个函数来生成密码的 MD5 散列值
def generate_md5_hash(text):
    return hashlib.md5(text.encode()).hexdigest()

# 获取当前时间并格式化
def format_time():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')
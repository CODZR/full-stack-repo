from ..utils import generate_md5_hash, format_time

# 定义用户数据
user_arr = [
    {
        'id': 1,
        'username': 'dzr',
        'password': generate_md5_hash('dzr159789'),
        'phone': '13335913629',
        'role': 'admin',
        'allow_login': True,
        'token': '',
        'avatar': 'https://profile.csdnimg.cn/4/B/B/0_qq_41970551',
        'open_id': '15343465465465',
        'session_key': '2165af56465aafda',
        'created_at': format_time()
    },
    {
        'id': 2,
        'username': 'codzr',
        'password': generate_md5_hash('codzr'),
        'phone': '1323123629',
        'role': 'admin',
        'allow_login': True,
        'token': '',
        'avatar': 'https://profile.csdnimg.cn/4/B/B/0_qq_41970551',
        'open_id': '1534346231465465',
        'session_key': '12165af565aafda',
        'created_at': format_time()
    }
]

def insert_user():
  # 插入数据到 PostgreSQL 数据库中的 user 表
  for user in user_arr:
      cur.execute("INSERT INTO user (id, username, password, phone, role, allow_login, token, avatar, open_id, session_key, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                  (user['id'], user['username'], user['password'], user['phone'], user['role'], user['allow_login'], user['token'], user['avatar'], user['open_id'], user['session_key'], user['created_at']))


  conn.commit()  # 提交事务
  cur.close()
  conn.close()

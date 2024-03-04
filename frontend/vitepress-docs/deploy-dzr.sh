#!/usr/bin/expect -f
# 部署vitepress-docs 到 120.55.86.100 /projects/vitepress-docs ，需电脑上有expect (brew install expect)
set user "root"
set host "120.55.86.100"
set password [lindex $argv 0]

spawn ssh -p 22 $user@$host
set timeout 30
expect {
  "connecting (yes/no/\[fingerprint\])?" { send "yes\r" }
  "$user@$host's password:" { send "$password\r" } 
}
expect "]*"

send "cd /home/admin/projects\r"
send "cd vitepress-docs\r"
send "git pull\r"
# expect "Username for 'https://github.com':"
# send "CODZR\r"
# expect "Password for 'https://github.com':"
# send "\r"
# 这个expect是为了获得git pull响应的结果，才能继续执行之后的代码
set timeout 30
expect { 
  "up-to-date" { send "echo 'Already up-to-date.'\r" } 
  "*deletions(-)" { send "echo 'pull succeed'\r" }
  "Aborting" { send "git stash\r git pull\r" }
  "fatal: not a git repository (or any of the parent directories):"  { interact }
  # git clone git@github.com:CODZR/vitepress-docs.git
}
# 这个等待时间要设置的大一些，不然还没bulid完连接就结束了
set timeout 100 
send "pnpm build\r"
# send "nginx -t\r"
# expect {
#   "*/etc/nginx/nginx.conf test is successful" { send "nginx -s reload\r" }
#   "other condation" { send "echo 'nginx error\r'" }
# }
expect "build complete in"
send "exit\r"
expect eof
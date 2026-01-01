---
isBlog: true
---
## SSH 密钥认证完整操作流程

### 步骤1：生成 SSH 密钥对

#### 检查是否已有密钥
```bash
ls -al ~/.ssh
```
如果看到 `id_rsa` 和 `id_rsa.pub` 或 `id_ed25519` 和 `id_ed25519.pub` 文件，说明已有密钥。

#### 生成新的密钥对（如果还没有）
```bash
## 使用 RSA 算法（兼容性更好）
ssh-keygen -t rsa -b 4096 -C "你的邮箱@example.com"

## 或者使用更现代的 Ed25519 算法
ssh-keygen -t ed25519 -C "你的邮箱@example.com"
```

**生成过程中的提示：**
- **Enter file in which to save the key**: 直接回车使用默认路径
- **Enter passphrase**: 设置一个密码（建议设置，增加安全性）
- **Enter same passphrase again**: 再次输入密码

### 步骤2：启动 SSH 代理并添加密钥

```bash
## 启动 SSH 代理
eval "$(ssh-agent -s)"

## 将私钥添加到 SSH 代理
ssh-add ~/.ssh/id_rsa
## 或者如果是 Ed25519
## ssh-add ~/.ssh/id_ed25519
```

### 步骤3：将公钥复制到远程服务器

#### 方法1：使用 ssh-copy-id（推荐）
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub ${REMOTE_HOST:-root@120.55.86.100}
```

如果远程服务器使用非标准端口（比如 2222）：
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub -p 2222 root@120.55.86.100
```

#### 方法2：手动复制（如果 ssh-copy-id 不可用）

1. **查看公钥内容：**
```bash
cat ~/.ssh/id_rsa.pub
```

2. **登录远程服务器并添加公钥：**
```bash
ssh root@120.55.86.100

## 在远程服务器上执行：
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 步骤4：测试无密码登录

```bash
ssh ${REMOTE_HOST:-root@120.55.86.100}
```

如果配置成功，应该可以直接登录，或者只需要输入密钥的密码（不是服务器密码）。

### 步骤5：配置 SSH 客户端（可选但推荐）

编辑本地 `~/.ssh/config` 文件：

```bash
nano ~/.ssh/config
```

添加以下内容：
```
Host deployment-server
    HostName 120.55.86.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes
```

然后修改你的脚本中的 `remote_host` 变量：
```bash
remote_host="deployment-server"
```

### 步骤6：禁用服务器密码登录（生产环境建议）

**在远程服务器上执行（谨慎操作！）：**

```bash
## 备份 SSH 配置
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

## 编辑配置
nano /etc/ssh/sshd_config

## 修改以下参数：
PasswordAuthentication no
PermitRootLogin without-password  # 或设置为 yes（如果还需要root登录）

## 重启 SSH 服务
systemctl restart sshd
```

**重要：** 在执行此步骤前，确保密钥认证工作正常，否则可能被锁在服务器外！

### 验证配置

现在你的部署脚本应该可以无密码运行了：

```bash
## 测试 scp 无密码传输
scp somefile.txt deployment-server:/tmp/

## 测试 ssh 命令
ssh deployment-server "whoami"
```

### 故障排除

#### 如果仍然需要密码：

1. **检查权限：**
```bash
## 本地权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

## 远程权限
ssh deployment-server "chmod 700 ~/.ssh; chmod 600 ~/.ssh/authorized_keys"
```

2. **检查 SSH 服务配置：**
```bash
## 在远程服务器上检查
grep -E "PasswordAuthentication|PubkeyAuthentication" /etc/ssh/sshd_config
```

3. **启用详细输出调试：**
```bash
ssh -v deployment-server
```

完成以上步骤后，你的部署脚本就可以实现无密码自动部署了。
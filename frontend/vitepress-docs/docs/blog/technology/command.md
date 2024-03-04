---
isBlog: true
---

# command

## curl
### GET
```
curl -b "cookie.txt" url
注释：
-b "cookie.txt"： 从这个文件中读取cookie
```

### POST
```
curl -b "cookie.txt" -H "Content-Type:application/json" -H "CSRF:abc" -d "{..}" url
注释：
-H param: 设置请求头
-H "Content-Type:application/json": 设置请求头Content-Type，以json格式发送
-H "CSRF:abc""： 设置请求头，发送CSRF这个参数
-d "{}"：-d后面跟着的为需要发送的数据
```
#### 注意事项：
* a. `-X POST`可省略，curl会自动判断为post命令
* b. json格式的话，如果在`{}`中用的是双引号`"`，需要转义为`\"`

### PUT/DELETE
```
curl -b "cookie.txt" -X PUT/DELETE -d "..." url
注释：
-X PUT/DELETE： 表示发送的是PUT/DELETE请求
```

#### 上传文件
```
curl -b "cookie.txt" -F "filename=@file" url
注释：
-F ""：将会以multipart/form-data发送POST数据；如果是发送文件的话，需要在参数前面加@
```

#### 注意事项：
a. 需要注意文件名或者文件路径是否正确，比如文件名中有空格之类的，需要注意，不然可能会报"failed creating formpost data"这个错误（当然这个错误不止这个原因）

#### 下载文件
```
curl -b "cookie.txt" -o filename url
curl -b "cookie.txt" -O url
注释：
-o 文件名 文件路径：将对应路径的文件以该文件名下载下来
-O：使用URL中默认的文件名保存到本地
```

#### 注意事项
* a. 还有其他断点下载之类的方法，可以自行百度

#### 注
在使用`-c`、`-b`读写cookie的时候，注意当前操作用户是否有读写文件权限，不然该方法可能会失效

#### 部分参数说明
| 参数 | 说明 |
| ---- | ---- |
|  -c file	|  将cookie写入到file这个文件中（file为文件路径）|  
|  -b file	|  从file这个文件中将cookie读取出来 |  
|  -X POST/PUT/DELETE	|  使用POST/PUT/DELETE方法 |  
|  -H param	|  设置请求头参数 |
|  -d ""	|  需要向后端发送的数据 |
|  -k	|  发送https请求的时候，不做认证 （当用https请求出错的时候，可以试下加-k） |
|  -v	|  看到详细的请求头中的信息 |
|  -i	|  看到详细返回头中的信息 |
|  -o filename url	|  将对应路径的文件以该文件名下载下来 |  
|  -O url	|  使用URL中默认的文件名保存到本地 |
|  -F "key=value" | curl会以multipart/form-data的方式发送POST请求 以key=value的形式发送数据 如果是文件的话，则需要以key=@value（加上@的标志）|  

from：https://www.jianshu.com/p/3aecc761fb9e

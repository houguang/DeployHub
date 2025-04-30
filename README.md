# DeployHub - 多平台部署工具

## 项目简介
DeployHub 是一个用于简化部署流程的工具，旨在帮助开发者更高效地管理和部署应用程序。它支持多种部署平台，包括 FTP、阿里云 OSS、腾讯云 COS 和火山引擎 TOS。

## 功能特点
- 支持多种部署平台（FTP、OSS、COS、TOS）
- 统一的配置管理
- 文件过滤功能
- 实时上传进度显示
- 灵活的错误处理

## 安装
```bash
npm -D install deployhub
```

## 配置说明
配置文件 `config.json` 包含以下部分：

### 公共配置
```json
{
    "common": {
        "localPath": "./test_files/",    // 本地文件目录
        "remotePath": "/",               // 远程目录
        "ignoreExtensions": [            // 要忽略的文件后缀
            ".map"
        ]
    }
}
```

### FTP 配置
```json
{
    "ftp": {
        "host": "127.0.0.1",      // FTP 服务器地址
        "user": "username",        // FTP 用户名
        "password": "password",    // FTP 密码
        "port": 21                 // FTP 端口
    }
}
```

### 阿里云 OSS 配置
```json
{
    "oss": {
        "region": "oss-cn-beijing",         // OSS 地域
        "accessKeyId": "id",                // 访问密钥 ID
        "accessKeySecret": "secret",        // 访问密钥密码
        "bucket": "bucketName"             // Bucket 名称
    }
}
```

### 腾讯云 COS 配置
```json
{
    "cos": {
        "SecretId": "id",                   // 密钥 ID
        "SecretKey": "secret",              // 密钥
        "Bucket": "test-1258437818",        // Bucket 名称
        "Region": "ap-beijing"              // 地域
    }
}
```

### 火山引擎 TOS 配置
```json
{
    "tos": {
        "accessKeyId": "id",                // 访问密钥 ID
        "accessKeySecret": "secret",        // 访问密钥密码
        "region": "cn-beijing",             // 地域
        "bucket": "bucketName"             // Bucket 名称
    }
}
```

## 使用方法

### 基本使用
```javascript
const { uploadViaFTP, uploadViaOSS, uploadViaCOS, uploadViaTOS, uploadDirectory } = require('deployhub');
const config = require('./config.json');

// FTP 上传
await uploadDirectory(uploadViaFTP, config.ftp, config.common);

// OSS 上传
await uploadDirectory(uploadViaOSS, config.oss, config.common);

// COS 上传
await uploadDirectory(uploadViaCOS, config.cos, config.common);

// TOS 上传
await uploadDirectory(uploadViaTOS, config.tos, config.common);
```

### 配置优先级
- 各平台配置中的 `localPath`、`remotePath` 和 `ignoreExtensions` 优先级高于公共配置
- 未配置时使用公共配置中的值

## 上传进度显示
上传过程中会实时显示进度，格式如下：

```
[平台名称] 当前文件序号/总文件数 [当前文件名称]
```
例如：
```
[FTP] 1/10 [index.html]
```

## 错误处理
- 上传失败时会输出详细的错误信息
- 不会中断整体上传流程，继续处理下一个文件
- 错误信息包含文件路径和具体错误原因

## 注意事项
1. 确保配置文件中的认证信息正确
2. 本地路径使用相对路径或绝对路径均可
3. 远程路径根据各平台要求配置
4. 文件过滤基于文件后缀名，不区分大小写

        
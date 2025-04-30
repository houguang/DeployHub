const ftp = require('basic-ftp');
const path = require('path');

/**
 * 创建远程目录（递归）
 * @param {ftp.Client} client - FTP 客户端实例
 * @param {string} remotePath - 远程目录路径
 */
async function ensureRemoteDirectory(client, remotePath) {
    const dirs = remotePath.split('/').filter(Boolean);
    let currentPath = '';
    
    for (const dir of dirs) {
        currentPath += '/' + dir;
        try {
            await client.ensureDir(currentPath);
        } catch (error) {
            // 忽略目录已存在的错误
            if (!error.message.includes('Directory already exists')) {
                throw error;
            }
        }
    }
}

/**
 * 使用 FTP 上传文件
 * @param {Object} config - FTP 配置
 * @param {string} localFilePath - 本地文件路径
 * @param {string} remoteFilePath - 远程文件路径
 * @param {number} currentFileIndex - 当前文件索引
 * @param {number} totalFiles - 总文件数
 * @returns {Promise<void>}
 */
async function uploadViaFTP(config, localFilePath, remoteFilePath, currentFileIndex, totalFiles) {
    const client = new ftp.Client();
    try {
        process.stdout.write(`\r[FTP] ${currentFileIndex + 1}/${totalFiles} [${localFilePath}]`);
        await client.access(config);
        
        // 确保远程目录存在
        const remoteDir = path.dirname(remoteFilePath);
        await ensureRemoteDirectory(client, remoteDir);
        
        // 上传文件
        await client.uploadFrom(localFilePath, remoteFilePath);
    } catch (error) {
        console.error(`\n[FTP] 文件上传失败: ${localFilePath}`, error);
    } finally {
        client.close();
    }
}

module.exports = uploadViaFTP;
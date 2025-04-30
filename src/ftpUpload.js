const ftp = require('basic-ftp');

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
        await client.uploadFrom(localFilePath, remoteFilePath);
    } catch (error) {
        console.error(`\n[FTP] 文件上传失败: ${localFilePath}`, error);
    } finally {
        client.close();
    }
}

module.exports = uploadViaFTP;
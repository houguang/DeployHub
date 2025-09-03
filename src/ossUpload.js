const OSS = require('ali-oss');
const { showProgress } = require('./utils');

/**
 * 使用 OSS 上传文件
 * @param {Object} config - OSS 配置
 * @param {string} localFilePath - 本地文件路径
 * @param {string} remoteFilePath - 远程文件路径
 * @param {number} currentFileIndex - 当前文件索引
 * @param {number} totalFiles - 总文件数
 * @returns {Promise<void>}
 */
async function uploadViaOSS(config, localFilePath, remoteFilePath, currentFileIndex, totalFiles) {
    const client = new OSS(config);
    try {
        showProgress('OSS', currentFileIndex, totalFiles, localFilePath);
        await client.put(remoteFilePath, localFilePath);
    } catch (error) {
        console.error(`\n[OSS] 文件上传失败: ${localFilePath}`, error);
    }
}

module.exports = uploadViaOSS;
const COS = require('cos-nodejs-sdk-v5');
const { showProgress } = require('./utils');

/**
 * 使用 COS 上传文件
 * @param {Object} config - COS 配置
 * @param {string} localFilePath - 本地文件路径
 * @param {string} remoteFilePath - 远程文件路径
 * @param {number} currentFileIndex - 当前文件索引
 * @param {number} totalFiles - 总文件数
 * @returns {Promise<void>}
 */
async function uploadViaCOS(config, localFilePath, remoteFilePath, currentFileIndex, totalFiles) {
    const client = new COS(config);
    try {
        showProgress('COS', currentFileIndex, totalFiles, localFilePath);
        await client.putObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: remoteFilePath,
            Body: require('fs').createReadStream(localFilePath)
        });
    } catch (error) {
        console.error(`\n[COS] 文件上传失败: ${localFilePath}`, error);
    }
}

module.exports = uploadViaCOS;
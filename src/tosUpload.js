const { TosClient } = require('@volcengine/tos-sdk');

/**
 * 使用 TOS 上传文件
 * @param {Object} config - TOS 配置
 * @param {string} localFilePath - 本地文件路径
 * @param {string} remoteFilePath - 远程文件路径
 * @param {number} currentFileIndex - 当前文件索引
 * @param {number} totalFiles - 总文件数
 * @returns {Promise<void>}
 */
async function uploadViaTOS(config, localFilePath, remoteFilePath, currentFileIndex, totalFiles) {
    const client = new TosClient(config);
    try {
        process.stdout.write(`\r[TOS] ${currentFileIndex + 1}/${totalFiles} [${localFilePath}]`);
        await client.putObject({
            bucket: config.bucket,
            key: remoteFilePath,
            body: require('fs').createReadStream(localFilePath)
        });
    } catch (error) {
        console.error(`\n[TOS] 文件上传失败: ${localFilePath}`, error);
    }
}

module.exports = uploadViaTOS;
const ftpUpload = require('./src/ftpUpload');
const ossUpload = require('./src/ossUpload');
const cosUpload = require('./src/cosUpload');
const tosUpload = require('./src/tosUpload');
const fs = require('fs');
const path = require('path');

/**
 * 过滤指定后缀的文件
 * @param {string} dirPath - 目录路径
 * @param {string[]} ignoreExtensions - 要忽略的文件后缀数组
 * @returns {string[]} - 符合条件的文件路径数组
 */
function filterFilesByExtension(dirPath, ignoreExtensions) {
    const files = fs.readdirSync(dirPath);
    return files.filter(file => !ignoreExtensions.includes(path.extname(file).toLowerCase()))
        .map(file => path.join(dirPath, file));
}

/**
 * 转换文件路径分隔符
 * @param {string} filePath - 文件路径
 * @returns {string} - 转换后的文件路径
 */
function convertPathSeparator(filePath) {
    return filePath.replace(/\\/g, '/');
}

/**
 * 上传目录中的所有文件
 * @param {Function|Function[]} uploadFunc - 上传函数或上传函数数组
 * @param {Object|Object[]} config - 配置对象或配置对象数组
 * @param {Object} commonConfig - 公共配置对象
 * @returns {Promise<void>}
 */
async function uploadDirectory(uploadFunc, config, commonConfig) {
    const configs = Array.isArray(config) ? config : [config];
    const uploadFuncs = Array.isArray(uploadFunc) ? uploadFunc : [uploadFunc];

    for (let i = 0; i < configs.length; i++) {
        const cfg = configs[i];
        const localPath = cfg.localPath || commonConfig.localPath;
        const remotePath = cfg.remotePath || commonConfig.remotePath;
        const ignoreExtensions = cfg.ignoreExtensions || commonConfig.ignoreExtensions;

        const files = filterFilesByExtension(localPath, ignoreExtensions);
        for (let j = 0; j < files.length; j++) {
            const file = files[j];
            const remoteFilePath = convertPathSeparator(path.join(remotePath, path.basename(file)));
            await uploadFuncs[i](cfg, file, remoteFilePath, j, files.length);
        }
    }
}

module.exports = {
    uploadViaFTP: ftpUpload,
    uploadViaOSS: ossUpload,
    uploadViaCOS: cosUpload,
    uploadViaTOS: tosUpload,
    uploadDirectory,
    filterFilesByExtension
};
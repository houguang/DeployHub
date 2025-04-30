const ftpUpload = require('./src/ftpUpload');
const ossUpload = require('./src/ossUpload');
const cosUpload = require('./src/cosUpload');
const tosUpload = require('./src/tosUpload');
const fs = require('fs');
const path = require('path');

/**
 * 递归获取目录下的所有文件
 * @param {string} dirPath - 目录路径
 * @param {string[]} ignoreExtensions - 要忽略的文件后缀数组
 * @param {string} baseDir - 基础目录路径（用于计算相对路径）
 * @returns {string[]} - 符合条件的文件路径数组
 */
function getAllFiles(dirPath, ignoreExtensions, baseDir = dirPath) {
    let results = [];
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, ignoreExtensions, baseDir));
        } else {
            if (!ignoreExtensions.includes(path.extname(file).toLowerCase())) {
                results.push(fullPath);
            }
        }
    }

    return results;
}

/**
 * 获取文件相对路径
 * @param {string} fullPath - 完整文件路径
 * @param {string} basePath - 基础目录路径
 * @returns {string} - 相对路径
 */
function getRelativePath(fullPath, basePath) {
    return path.relative(basePath, fullPath);
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

        const files = getAllFiles(localPath, ignoreExtensions);
        let uploadedCount = 0;
        const totalFiles = files.length;

        for (const file of files) {
            const relativePath = getRelativePath(file, localPath);
            const remoteFilePath = convertPathSeparator(path.join(remotePath, relativePath));
            await uploadFuncs[i](cfg, file, remoteFilePath, uploadedCount++, totalFiles);
        }
    }
}

module.exports = {
    uploadViaFTP: ftpUpload,
    uploadViaOSS: ossUpload,
    uploadViaCOS: cosUpload,
    uploadViaTOS: tosUpload,
    uploadDirectory,
    getAllFiles
};
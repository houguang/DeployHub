/**
 * 显示上传进度（解决文件名长短不一导致的显示问题）
 * @param {string} platform - 平台名称
 * @param {number} currentFileIndex - 当前文件索引
 * @param {number} totalFiles - 总文件数
 * @param {string} fileName - 文件名
 */
function showProgress(platform, currentFileIndex, totalFiles, fileName) {
    const progressText = `[${platform}] ${currentFileIndex + 1}/${totalFiles} [${fileName}]`;
    // 获取终端宽度，如果无法获取则使用默认值 120
    const terminalWidth = process.stdout.columns || 120;
    // 使用空格填充到终端宽度，确保完全覆盖之前的内容
    const paddedText = progressText.padEnd(terminalWidth, ' ');
    process.stdout.write(`\r${paddedText}`);
}

module.exports = {
    showProgress
};
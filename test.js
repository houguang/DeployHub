const { uploadViaFTP, uploadViaOSS, uploadViaCOS, uploadViaTOS, uploadDirectory } = require('./index');
const config = require('./config.json');

/**
 * 测试 FTP 文件上传
 * @returns {Promise<void>}
 */
async function testFTPUpload() {
    try {
        await uploadDirectory(uploadViaFTP, config.ftp, config.common);
        console.log('FTP 测试完成');
    } catch (error) {
        console.error('FTP 测试失败:', error);
    }
}

/**
 * 测试 OSS 文件上传
 * @returns {Promise<void>}
 */
async function testOSSUpload() {
    try {
        await uploadDirectory(uploadViaOSS, config.oss, config.common);
        console.log('OSS 测试完成');
    } catch (error) {
        console.error('OSS 测试失败:', error);
    }
}

/**
 * 测试 COS 文件上传
 * @returns {Promise<void>}
 */
async function testCOSUpload() {
    try {
        await uploadDirectory(uploadViaCOS, config.cos, config.common);
        console.log('COS 测试完成');
    } catch (error) {
        console.error('COS 测试失败:', error);
    }
}

/**
 * 测试 TOS 文件上传
 * @returns {Promise<void>}
 */
async function testTOSUpload() {
    try {
        await uploadDirectory(uploadViaTOS, config.tos, config.common);
        console.log('TOS 测试完成');
    } catch (error) {
        console.error('TOS 测试失败:', error);
    }
}

/**
 * 运行所有测试
 * @returns {Promise<void>}
 */
async function runTests() {
    await testFTPUpload();
    await testOSSUpload();
    await testCOSUpload();
    await testTOSUpload();
}

runTests();
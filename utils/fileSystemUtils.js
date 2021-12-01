// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));

const fs = require('fs');
const { promisify } = require('util');

const NAMESPACE = 'fileSystemUtils';
const fsHelpers = {
    readFileAsync: promisify(fs.readFile),
    writeFileAsync: promisify(fs.writeFile),
    existAsync: promisify(fs.exists),
    mkdirAsync: promisify(fs.mkdir),
    accessAsync: promisify(fs.access),
    rmdirAsync: promisify(fs.rmdir),
    unlinkAsync: promisify(fs.unlink),
};

const fileSystemUtils = {
    // Has read/write/execute permissions (If no mode is provided, this is the default)
    fileHasAllPermissions: async (filePath) => fsHelpers.accessAsync(filePath, fs.F_OK),
    // Check if we have read/write permissions
    isFileWriteable: async (filePath) => fsHelpers.accessAsync(filePath, fs.W_OK),
    // checks execute permission
    isFileExecutable: async (filePath) => fsHelpers.accessAsync(filePath, fs.X_OK),
    createDirectoryIfNotExist: async (dirPath) => {
        try {
            if (!dirPath) throw new Error('Directory path is required.');
            const exist = await fsHelpers.existAsync(dirPath, '0777');
            if (!exist) {
                await fsHelpers.mkdirAsync(dirPath);
                return true;
            }

            return true;
        } catch (err) {
            console.log(err.stack);
            throw new Error(err);
        }
    },
    deleteDirectory: async (dirPath) => {
        try {
            if (!dirPath) throw new Error('Directory path is required.');
            const exist = await fsHelpers.existAsync(dirPath, '0777');
            if (exist) {
                await fsHelpers.rmdirAsync(dirPath, { force: true, recursive: true });
                return true;
            }

            return false;
        } catch (err) {
            console.log(err.stack);
            throw new Error(err);
        }
    },
    unlinkFileAsync: async (filePath) => {
        try {
            if (!filePath) throw new Error('File path is required.');
            const exist = await fsHelpers.existAsync(filePath, '0777');
            if (exist) {
                await fsHelpers.unlinkAsync(filePath);
                return true;
            }

            return false;
        } catch (err) {
            console.log(err.stack);
            throw new Error(err);
        }
    },
    createFileWithPermissions: async (permissions) => {
        try {
            if (!permissions) throw new Error('Permissions are required.');
            else {
            }
        } catch (err) {
            console.log(err.stack);
            throw new Error(err.message);
        }
    },
    existAsync: fsHelpers.existAsync,
    readFileAsync: fsHelpers.readFileAsync,
    writeFileAsync: fsHelpers.writeFileAsync,

};

module.exports = fileSystemUtils;
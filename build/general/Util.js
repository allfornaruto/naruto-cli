"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readdir = void 0;
const path = require("path");
const fs = require("fs");
function readdir(dirPath) {
    const ret = [];
    const paths = fs.readdirSync(dirPath);
    paths.forEach(p => {
        const targetPath = path.join(dirPath, p);
        const fileType = getFileType(targetPath);
        switch (fileType) {
            case FileType.File:
                ret.push(targetPath);
                break;
            case FileType.Directory:
                ret.push(...readdir(targetPath));
                break;
            default:
        }
    });
    return ret;
}
exports.readdir = readdir;
var FileType;
(function (FileType) {
    FileType[FileType["File"] = 0] = "File";
    FileType[FileType["Directory"] = 1] = "Directory";
    FileType[FileType["Unknown"] = 2] = "Unknown";
})(FileType || (FileType = {}));
function getFileType(filePath) {
    const stat = fs.statSync(filePath);
    switch (true) {
        case stat.isFile():
            return FileType.File;
        case stat.isDirectory():
            return FileType.Directory;
        default:
            return FileType.Unknown;
    }
}

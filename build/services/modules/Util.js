"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const fs = require("fs-extra");
const path = require("path");
const micromatch = require("micromatch");
var Util;
(function (Util) {
    function readDirRecursive(dirPath, patterns) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = (yield fs.readdir(dirPath)).map(f => path.resolve(path.join(dirPath, f)));
            for (const f of files) {
                const stat = yield fs.stat(f);
                if (stat.isDirectory() === true) {
                    files = files.concat(yield readDirRecursive(f, patterns));
                }
            }
            return patterns ? files.filter(f => micromatch([f], patterns, { matchBase: true }).length > 0) : files;
        });
    }
    Util.readDirRecursive = readDirRecursive;
    function isExists(filePath) {
        return new Promise(resolve => fs.exists(filePath, exists => resolve(exists)));
    }
    Util.isExists = isExists;
})(Util = exports.Util || (exports.Util = {}));

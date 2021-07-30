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
exports.TinifyCompressImages = void 0;
const tinify = require("tinify");
const fs = require("fs");
const Tinify = tinify.default;
var TinifyCompressImages;
(function (TinifyCompressImages) {
    function output(key, imgPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldFileStates = fs.statSync(imgPath);
                const oldSize = (oldFileStates.size / 1024).toFixed(2);
                Tinify.key = key;
                const source = tinify.fromFile(imgPath);
                yield source.toFile(imgPath);
                const newFileStates = fs.statSync(imgPath);
                const newSize = (newFileStates.size / 1024).toFixed(2);
                const compressRate = ((1 - Number(newSize) / Number(oldSize)) * 100).toFixed(2);
                console.log(`${imgPath} 压缩成功 ${oldSize}KB -> ${newSize}KB 节省: ${compressRate}%空间`);
                return Promise.resolve();
            }
            catch (e) {
                return Promise.reject();
            }
        });
    }
    TinifyCompressImages.output = output;
})(TinifyCompressImages = exports.TinifyCompressImages || (exports.TinifyCompressImages = {}));

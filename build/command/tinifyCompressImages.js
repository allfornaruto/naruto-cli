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
exports.tinifyCompressImages = void 0;
const path = require("path");
const service = require("../services");
const fs = require("fs");
const modules_1 = require("../services/modules");
function tinifyCompressImages(key, imgDirPath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolveImgPath = path.resolve(imgDirPath);
        let allImgs = yield modules_1.Util.readDirRecursive(resolveImgPath, options.globPatterns);
        if (options.minSize) {
            allImgs = allImgs.filter(imgPath => {
                const fileStates = fs.statSync(imgPath);
                const minSize_b = options.minSize * 1024;
                if (fileStates.size > minSize_b)
                    return true;
                return false;
            });
        }
        yield Promise.all(allImgs.map(imgPath => {
            return service.TinifyCompressImages.output(key, imgPath);
        }));
    });
}
exports.tinifyCompressImages = tinifyCompressImages;

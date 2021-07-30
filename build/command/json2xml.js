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
exports.json2xml = void 0;
const path = require("path");
const fs = require("fs-extra");
const service = require("../services");
const modules_1 = require("../services/modules");
function json2xml(jsonDirPath, outDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolveJsonPath = path.resolve(jsonDirPath);
        const resolveOutPath = path.resolve(outDir);
        const readDir = yield modules_1.Util.readDirRecursive(resolveJsonPath, ["*.json"]);
        const objects = yield Promise.all(readDir.map(p => fs.readJson(p)));
        yield service.Json2Xml.output(objects, resolveOutPath);
    });
}
exports.json2xml = json2xml;

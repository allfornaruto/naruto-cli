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
exports.Excel2Json = void 0;
const fs = require("fs-extra");
const path = require("path");
const modules = require("./modules");
const types = require("../types");
const tempDir = path.resolve(__dirname, "../../output/jsonForXml");
var Excel2Json;
(function (Excel2Json) {
    function output(excelDirPath, outDirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield convert(excelDirPath);
            yield Promise.all(books.map((book) => __awaiter(this, void 0, void 0, function* () {
                yield fs.outputJson(path.join(tempDir, `${book.name}.json`), book);
                yield fs.outputJson(path.join(outDirPath, `${book.name}.json`), book.rows);
            })));
        });
    }
    Excel2Json.output = output;
    function convert(excelDirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return modules.Convert.excels2bookObject(excelDirPath, types.RowsTransformType.Language);
        });
    }
    Excel2Json.convert = convert;
})(Excel2Json = exports.Excel2Json || (exports.Excel2Json = {}));

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
exports.Excel2EventTs = void 0;
const fs = require("fs-extra");
const path = require("path");
const modules = require("./modules");
const ejs = require("ejs");
const types = require("../types");
var Excel2EventTs;
(function (Excel2EventTs) {
    function output(excelDirPath, outDirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield convert(excelDirPath);
            const interfaceTemplate = path.resolve(__dirname, "../../ejs/event.ts.ejs");
            yield Promise.all(books.map((book) => __awaiter(this, void 0, void 0, function* () {
                fs.outputFileSync(path.join(outDirPath, `${book.name}.ts`), ejs.render(fs.readFileSync(interfaceTemplate, "utf8"), { rows: book.rows }));
            })));
        });
    }
    Excel2EventTs.output = output;
    function convert(excelDirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return modules.Convert.excels2bookObject(excelDirPath, types.RowsTransformType.Event);
        });
    }
    Excel2EventTs.convert = convert;
})(Excel2EventTs = exports.Excel2EventTs || (exports.Excel2EventTs = {}));

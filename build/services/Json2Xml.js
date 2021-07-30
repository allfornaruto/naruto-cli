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
exports.Json2Xml = void 0;
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
var Json2Xml;
(function (Json2Xml) {
    function output(books, outDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const interfaceTemplate = path.resolve(__dirname, "../../ejs/strMap.xml.ejs");
            books.forEach(book => {
                fs.outputFileSync(path.join(outDir, `${book.name}.xml`), ejs.render(fs.readFileSync(interfaceTemplate, "utf8"), { rows: book.rows }));
            });
        });
    }
    Json2Xml.output = output;
})(Json2Xml = exports.Json2Xml || (exports.Json2Xml = {}));

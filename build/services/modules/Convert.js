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
exports.Convert = void 0;
const xlsx = require("xlsx");
const path = require("path");
const camelcase = require("camelcase");
const modules_1 = require("../modules");
const errors = require("../../errors");
const types = require("../../types");
var Convert;
(function (Convert) {
    function excels2bookObject(excelDir, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets = [];
            const convertMap = yield getConvertExcelMap(excelDir);
            for (const setting of convertMap.values()) {
                const books = yield excel2bookObject(setting, type);
                sheets.push(...books);
            }
            return sheets;
        });
    }
    Convert.excels2bookObject = excels2bookObject;
    function getConvertExcelMap(excelDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const allXlsx = yield modules_1.Util.readDirRecursive(excelDir, ["*.xlsx", "*.xlsm"]);
            const map = new Map();
            for (const fp of allXlsx) {
                const fileName = path.basename(fp, path.extname(fp));
                if (map.has(fileName) === true) {
                    throw new Error(`文件名重复: ${fp}`);
                }
                map.set(fileName, {
                    output: fileName,
                    files: [fp],
                });
            }
            return map;
        });
    }
    function excel2bookObject(setting, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workBooks = setting.files.map(filePath => xlsx.readFile(filePath));
                const book = workBooks[0];
                const sheet = getWorkSheet(book, "Sheet1");
                let rows;
                let result;
                switch (type) {
                    case types.RowsTransformType.Language:
                        rows = rowsTransformOfLanguage(sheet.rows);
                        const langKeys = Object.keys(rows);
                        result = langKeys.map(langKey => {
                            const tableName = camelcase(langKey);
                            return {
                                name: tableName,
                                rows: rows[langKey],
                            };
                        });
                        return result;
                    case types.RowsTransformType.Event:
                        rows = rowsTransformOfEvent(sheet.rows);
                        result = [
                            {
                                name: types.RowsTransformType.Event,
                                rows,
                            },
                        ];
                        return result;
                }
            }
            catch (e) {
                if (e instanceof errors.BaseError) {
                    throw new Error(`${JSON.stringify(setting)}: ${JSON.stringify(e.message)}`);
                }
                else {
                    throw e;
                }
            }
        });
    }
    function getWorkSheet(book, sheetName) {
        const workSheet = xlsx.utils.sheet_to_json(book.Sheets[sheetName], { raw: false });
        return {
            rows: workSheet,
        };
    }
    function rowsTransformOfLanguage(rows) {
        const fileNameRow = rows.find(row => row["变量名"] === "file_name");
        if (!fileNameRow)
            throw Error(`缺少变量名为file_name的列`);
        const fileNames = Object.keys(fileNameRow).filter(key => !["场景", "变量名"].includes(key));
        const result = {};
        const langMap = {};
        fileNames.forEach(fileName => {
            langMap[fileNameRow[fileName]] = fileName;
            langMap[fileName] = fileNameRow[fileName];
            result[fileNameRow[fileName]] = {};
        });
        const langRows = rows.filter(row => row["变量名"] && row["变量名"] !== "file_name");
        langRows.forEach(row => {
            const rowLangKeys = Object.keys(row).filter(key => !["场景", "变量名"].includes(key));
            rowLangKeys.forEach(key => {
                result[langMap[key]][row["变量名"]] = row[key];
            });
        });
        return result;
    }
    function rowsTransformOfEvent(rows) {
        const result = {};
        rows.forEach(row => {
            const key = camelcase(row["事件名称"], { pascalCase: true });
            result[key] = row["事件名称"];
        });
        return result;
    }
})(Convert = exports.Convert || (exports.Convert = {}));

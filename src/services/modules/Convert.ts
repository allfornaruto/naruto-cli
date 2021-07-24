import * as xlsx from "xlsx";
import * as path from "path";
import * as camelcase from "camelcase";
import { Util } from "../modules";
import * as errors from "../../errors";
import * as types from "../../types";

export module Convert {
  export async function excels2bookObject(excelDir: string, type: types.RowsTransformType): Promise<types.BookObject[]> {
    const sheets: types.BookObject[] = [];
    const convertMap = await getConvertExcelMap(excelDir);
    for (const setting of convertMap.values()) {
      const books = await excel2bookObject(setting, type);
      sheets.push(...books);
    }
    return sheets;
  }

  async function getConvertExcelMap(excelDir: string): Promise<types.ConvertMap> {
    const allXlsx = await Util.readDirRecursive(excelDir, ["*.xlsx", "*.xlsm"]);
    const map: types.ConvertMap = new Map();

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
  }

  async function excel2bookObject(setting: types.ConvertSetting, type: types.RowsTransformType): Promise<types.BookObject[]> {
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
    } catch (e) {
      if (e instanceof errors.BaseError) {
        throw new Error(`${JSON.stringify(setting)}: ${JSON.stringify(e.message)}`);
      } else {
        throw e;
      }
    }
  }

  function getWorkSheet(book: xlsx.WorkBook, sheetName: string): types.SheetObject {
    const workSheet = xlsx.utils.sheet_to_json<{ Header: any }>(book.Sheets[sheetName], { raw: false });
    return {
      rows: workSheet,
    };
  }

  function rowsTransformOfLanguage(rows: types.SheetRow[]) {
    const fileNameRow = rows.find(row => row["变量名"] === "file_name");
    if (!fileNameRow) throw Error(`缺少变量名为file_name的列`);
    const fileNames = Object.keys(fileNameRow).filter(key => !["场景", "变量名"].includes(key));
    const result: { [key: string]: { [key: string]: string } } = {};
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

  function rowsTransformOfEvent(rows: types.SheetRow[]) {
    const result: { [key: string]: string } = {};
    rows.forEach(row => {
      const key = camelcase(row["事件名称"], { pascalCase: true });
      result[key] = row["事件名称"];
    });
    return result;
  }
}

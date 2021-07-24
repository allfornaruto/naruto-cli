import * as fs from "fs-extra";
import * as path from "path";
import * as modules from "./modules";
import * as types from "../types";

const tempDir = path.resolve(__dirname, "../../output/jsonForXml");

export module Excel2Json {
  export async function output(excelDirPath: string, outDirPath: string) {
    const books = await convert(excelDirPath);
    await Promise.all(
      books.map(async book => {
        await fs.outputJson(path.join(tempDir, `${book.name}.json`), book);
        await fs.outputJson(path.join(outDirPath, `${book.name}.json`), book.rows);
      })
    );
  }
  export async function convert(excelDirPath: string): Promise<types.BookObject[]> {
    return modules.Convert.excels2bookObject(excelDirPath, types.RowsTransformType.Language);
  }
}

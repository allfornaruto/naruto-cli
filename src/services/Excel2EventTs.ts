import * as fs from "fs-extra";
import * as path from "path";
import * as modules from "./modules";
import * as ejs from "ejs";
import * as types from "../types";

export module Excel2EventTs {
  export async function output(excelDirPath: string, outDirPath: string) {
    const books = await convert(excelDirPath);
    const interfaceTemplate = path.resolve(__dirname, "../../ejs/event.ts.ejs");
    await Promise.all(
      books.map(async book => {
        fs.outputFileSync(
          path.join(outDirPath, `${book.name}.ts`),
          ejs.render(fs.readFileSync(interfaceTemplate, "utf8"), { rows: book.rows })
        );
      })
    );
  }
  export async function convert(excelDirPath: string): Promise<types.BookObject[]> {
    return modules.Convert.excels2bookObject(excelDirPath, types.RowsTransformType.Event);
  }
}

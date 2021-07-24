import * as path from "path";
import * as fs from "fs-extra";
import * as ejs from "ejs";
import * as types from "../types";

export module Json2Xml {
  export async function output(books: types.BookObject[], outDir: string) {
    const interfaceTemplate = path.resolve(__dirname, "../../ejs/strMap.xml.ejs");
    books.forEach(book => {
      fs.outputFileSync(
        path.join(outDir, `${book.name}.xml`),
        ejs.render(fs.readFileSync(interfaceTemplate, "utf8"), { rows: book.rows })
      );
    });
  }
}

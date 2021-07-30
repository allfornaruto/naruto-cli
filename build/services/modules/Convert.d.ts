import * as types from "../../types";
export declare module Convert {
    function excels2bookObject(excelDir: string, type: types.RowsTransformType): Promise<types.BookObject[]>;
}

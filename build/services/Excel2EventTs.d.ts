import * as types from "../types";
export declare module Excel2EventTs {
    function output(excelDirPath: string, outDirPath: string): Promise<void>;
    function convert(excelDirPath: string): Promise<types.BookObject[]>;
}

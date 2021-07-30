export declare namespace Util {
    function readDirRecursive(dirPath: string, patterns?: string[]): Promise<string[]>;
    function isExists(filePath: string): Promise<boolean>;
}

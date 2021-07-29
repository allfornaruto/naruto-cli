export enum RowsTransformType {
  Language = "Language",
  Event = "Event",
}
export type TableName = string;
export interface ConvertSetting {
  output: TableName;
  files: string[];
}
export type ConvertMap = Map<TableName, ConvertSetting>;

export type SheetName = string;
export type SheetRow = { [key: string]: any };
export interface SheetObject {
  rows: SheetRow[];
}
export interface BookObject {
  name: SheetName;
  rows: SheetRow;
}
export interface TinifyCompressImagesOptions {
  /**
   * 低于该大小的图片会被忽略，单位kb
   */
  minSize: number;
  globPatterns: string[];
}

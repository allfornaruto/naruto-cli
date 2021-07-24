import * as service from "../services";

export async function excel2json(excelDirPath: string, outDir: string): Promise<void> {
  await service.Excel2Json.output(excelDirPath, outDir);
}

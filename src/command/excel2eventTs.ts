import * as service from "../services";

export async function excel2eventTs(excelDirPath: string, outDir: string): Promise<void> {
  await service.Excel2EventTs.output(excelDirPath, outDir);
}

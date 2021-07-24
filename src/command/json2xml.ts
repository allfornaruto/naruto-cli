import * as path from "path";
import * as fs from "fs-extra";
import * as service from "../services";
import { Util } from "../services/modules";
import * as types from "../types";

export async function json2xml(jsonDirPath: string, outDir: string): Promise<void> {
  const resolveJsonPath = path.resolve(jsonDirPath);
  const resolveOutPath = path.resolve(outDir);
  const readDir = await Util.readDirRecursive(resolveJsonPath, ["*.json"]);
  const objects = <types.BookObject[]>await Promise.all(readDir.map(p => fs.readJson(p)));
  await service.Json2Xml.output(objects, resolveOutPath);
}

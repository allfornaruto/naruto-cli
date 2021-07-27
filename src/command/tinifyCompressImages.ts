import * as path from "path";
import * as service from "../services";
import { Util } from "../services/modules";

export async function tinifyCompressImages(key: string, imgDirPath: string): Promise<void> {
  const resolveImgPath = path.resolve(imgDirPath);
  const allImgs = await Util.readDirRecursive(resolveImgPath, ["*.jpg", ".png"]);
  await Promise.all(allImgs.map(imgPath => service.TinifyCompressImages.output(key, imgPath)));
}

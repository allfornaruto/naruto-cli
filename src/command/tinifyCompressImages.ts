import * as path from "path";
import * as service from "../services";
import * as types from "../types";
import * as fs from "fs";
import { Util } from "../services/modules";

export async function tinifyCompressImages(
  key: string,
  imgDirPath: string,
  options: types.TinifyCompressImagesOptions
): Promise<void> {
  const resolveImgPath = path.resolve(imgDirPath);
  let allImgs = await Util.readDirRecursive(resolveImgPath, options.globPatterns);
  console.log(`成功匹配以下图片:`);
  console.log(allImgs);
  if (options.minSize) {
    allImgs = allImgs.filter(imgPath => {
      const fileStates = fs.statSync(imgPath);
      const minSize_b = options.minSize * 1024;
      if (fileStates.size > minSize_b) return true;
      return false;
    });
  }

  await Promise.all(
    allImgs.map(imgPath => {
      return service.TinifyCompressImages.output(key, imgPath);
    })
  );
}

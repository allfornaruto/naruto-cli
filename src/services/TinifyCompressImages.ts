import * as tinify from "tinify";
import * as fs from "fs";

const Tinify = tinify.default;

export module TinifyCompressImages {
  export async function output(key: string, imgPath: string) {
    try {
      const oldFileStates = fs.statSync(imgPath);
      const oldSize = (oldFileStates.size / 1024).toFixed(2);

      Tinify.key = key;
      const source = tinify.fromFile(imgPath);
      await source.toFile(imgPath);

      const newFileStates = fs.statSync(imgPath);
      const newSize = (newFileStates.size / 1024).toFixed(2);
      const compressRate = ((1 - Number(newSize) / Number(oldSize)) * 100).toFixed(2);
      console.log(`${imgPath} 压缩成功 ${oldSize}KB -> ${newSize}KB 节省: ${compressRate}%空间`);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  }
}

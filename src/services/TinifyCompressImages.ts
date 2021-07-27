import * as tinify from "tinify";

const Tinify = tinify.default;

export module TinifyCompressImages {
  export async function output(key: string, imgPath: string) {
    Tinify.key = key;
    const source = tinify.fromFile(imgPath);
    return source.toFile(imgPath);
  }
}

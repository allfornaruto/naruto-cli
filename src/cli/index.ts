#! /usr/bin/env node

import * as commander from "commander";
import * as cmd from "../command";
import * as types from "../types";

const program = new commander.Command();

program.command("excel2json <excelDirPath> <outDirPath>").action(async (excelDirPath: string, outDirPath: string) => {
  try {
    await cmd.excel2json(excelDirPath, outDirPath);
  } catch (e) {
    console.error(e);
  }
});

program
  .command("json2xml <jsonObjectDirPath> <outDirPath>")
  .action(async (jsonObjectDirPath: string, outDirPath: string) => {
    try {
      await cmd.json2xml(jsonObjectDirPath, outDirPath);
    } catch (e) {
      console.error(e);
    }
  });

program
  .command("excel2eventTs <excelDirPath> <outDirPath>")
  .action(async (excelDirPath: string, outDirPath: string) => {
    try {
      await cmd.excel2eventTs(excelDirPath, outDirPath);
    } catch (e) {
      console.error(e);
    }
  });

program
  .command("tinifyCompressImages <key> <imgDirPath>")
  .option("-ms, --minSize <minSize>", "低于该大小的文件会被忽略，单位KB")
  .option(
    "-gp, --globPatterns <globPatterns>",
    `符合该通配表达式的文件才会被压缩, 默认值为"*.png,*.jpg"`,
    value => value.split(","),
    ["*.jpg", "*.png"]
  )
  .action(async (key: string, imgDirPath: string, options: types.TinifyCompressImagesOptions) => {
    try {
      console.log(options);
      await cmd.tinifyCompressImages(key, imgDirPath, options);
    } catch (e) {
      console.error(e);
    }
  });

program.parse(process.argv);

process.on("unhandledRejection", e => {
  console.error(e);
  process.exit(1);
});

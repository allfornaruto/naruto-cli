#! /usr/bin/env node

import * as commander from "commander";
import * as cmd from "../command";

const program = new commander.Command();

program.command("excel2json <excelDirPath> <outDirPath>").action(async (excelDirPath: string, outDirPath: string) => {
  try {
    await cmd.excel2json(excelDirPath, outDirPath);
  } catch (e) {
    console.error(e.message);
    throw e;
  }
});

program
  .command("json2xml <jsonObjectDirPath> <outDirPath>")
  .action(async (jsonObjectDirPath: string, outDirPath: string) => {
    try {
      await cmd.json2xml(jsonObjectDirPath, outDirPath);
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  });

program
  .command("excel2eventTs <excelDirPath> <outDirPath>")
  .action(async (excelDirPath: string, outDirPath: string) => {
    try {
      await cmd.excel2eventTs(excelDirPath, outDirPath);
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  });

program.parse(process.argv);

process.on("unhandledRejection", e => {
  console.error(e);
  process.exit(1);
});

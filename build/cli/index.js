#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const cmd = require("../command");
const program = new commander.Command();
program.command("excel2json <excelDirPath> <outDirPath>").action((excelDirPath, outDirPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cmd.excel2json(excelDirPath, outDirPath);
    }
    catch (e) {
        console.error(e);
    }
}));
program
    .command("json2xml <jsonObjectDirPath> <outDirPath>")
    .action((jsonObjectDirPath, outDirPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cmd.json2xml(jsonObjectDirPath, outDirPath);
    }
    catch (e) {
        console.error(e);
    }
}));
program
    .command("excel2eventTs <excelDirPath> <outDirPath>")
    .action((excelDirPath, outDirPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cmd.excel2eventTs(excelDirPath, outDirPath);
    }
    catch (e) {
        console.error(e);
    }
}));
program
    .command("tinifyCompressImages <key> <imgDirPath>")
    .option("-ms, --minSize <minSize>", "低于该大小的文件会被忽略，单位KB")
    .option("-gp, --globPatterns <globPatterns>", `符合该通配表达式的文件才会被压缩, 默认值为"*.png,*.jpg"`, value => value.split(","), ["*.jpg", "*.png"])
    .action((key, imgDirPath, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(options);
        yield cmd.tinifyCompressImages(key, imgDirPath, options);
    }
    catch (e) {
        console.error(e);
    }
}));
program.parse(process.argv);
process.on("unhandledRejection", e => {
    console.error(e);
    process.exit(1);
});

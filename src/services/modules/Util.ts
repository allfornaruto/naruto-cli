import * as fs from "fs-extra";
import * as path from "path";
import * as micromatch from "micromatch";

export namespace Util {
	export async function readDirRecursive(dirPath: string, patterns?: string[]): Promise<string[]> {
		let files: string[] = (await fs.readdir(dirPath)).map(f => path.resolve(path.join(dirPath, f)));
		for (const f of files) {
			const stat = await fs.stat(f);
			if (stat.isDirectory() === true) {
				files = files.concat(await readDirRecursive(f, patterns));
			}
		}
		return patterns ? files.filter(f => micromatch([f], patterns, { matchBase: true }).length > 0) : files;
	}

	export function isExists(filePath: string): Promise<boolean> {
		return new Promise(resolve => fs.exists(filePath, exists => resolve(exists)));
	}
}

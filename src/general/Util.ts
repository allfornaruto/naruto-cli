import * as path from "path";
import * as fs from "fs";

export function readdir(dirPath: string): string[] {
	const ret: string[] = [];
	const paths = fs.readdirSync(dirPath);

	paths.forEach(p => {
		const targetPath = path.join(dirPath, p);
		const fileType = getFileType(targetPath);
		switch (fileType) {
		case FileType.File:
			ret.push(targetPath);
			break;

		case FileType.Directory:
			ret.push(...readdir(targetPath));
			break;

		default:
		}
	});

	return ret;
}

enum FileType {
	File, Directory, Unknown,
}
function getFileType(filePath: string): FileType {
	const stat = fs.statSync(filePath);
	switch (true) {
	case stat.isFile():
		return FileType.File;

	case stat.isDirectory():
		return FileType.Directory;

	default:
		return FileType.Unknown;
	}
}

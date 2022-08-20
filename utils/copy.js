import { readFile, writeFile, promises as fsPromises } from 'fs';
import copy from 'copy-template-dir';
import path from 'path';

// From Directory: ../templates/(TEMPLATE)
// To Directory: process.cwd()

let copyFiles = async (from, to, varsToReplace, debug) => {
	copy(from, to, varsToReplace, (err, created) => {
		if (err) throw err;

		created.forEach((file) => {
			debug && console.log(`created ${file}`);

			debug && console.log(`Replacing values on ${file}`)
			// replace(file, "{{name}}", "my name")
		});
	});
};

export default copyFiles;

async function replace(file, what, withW) {
	readFile(file, 'utf-8', function (err, contents) {
		if (err) {
			console.log(err);
			return;
		}

		const replaced = contents.replace(
			`${what}\g`,
			withW
		);

		writeFile(file, replaced, 'utf-8', function (err) {
			console.log(err);
		});
	});
}
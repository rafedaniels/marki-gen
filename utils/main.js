import copy from './copy.js';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

import Listr from 'listr';

export default async ({ opts, answers }) => {
	let { install, git, debug } = opts;
	let { template, name, version, deps } = answers;

	let templatePath = path.join(__dirname, '..', 'templates', template);
	let toPath = path.join(process.cwd(), name);

	let tasks = [
		{
			title: 'Copy files',
			task: async () => {
				await copy(
					templatePath,
					toPath,
					{
						name,
						version
					},
					debug
				);
			}
		},
		{
			title: 'Install Dependencies',
			task: async (ctx, task) => {
				// if(yarn) {
				// 	exec(`cd ${toPath} && yarn`, (error, stdout, stderr) => {
				// 		if(error) throw new Error("Yarn is not accesible. Install it or install dependencies with NPM.")
				// 		if(stderr) throw new Error(stderr)
				// 		console.log(stdout)
				// 	})

				// 	return
				// }

				//TODO: Yarn Support

				if (deps) {
					deps.forEach(async (dep) => {
						await exec(
							`cd ${toPath} && npm install ${dep} && npm install`,
							(error, stdout, stderr) => {
								if (error) throw new Error(error);
								if (stderr) console.log(stderr);
								debug && console.log(stdout);
							}
						);
					});
					return true;
				}

				await exec(
					`cd ${toPath} && npm install`,
					(error, stdout, stderr) => {
						if (error) throw new Error(error);
						if (stderr) console.log(stderr);
						debug && console.log(stdout);
					}
				);
			},
			skip: () => {
				if (!install)
					return 'Automatic installation not specified (--install)';
			}
		},
		{
			title: 'Initializing GIT',
			task: async (ctx, task) => {
				await exec(
					`cd ${toPath} && git init`,
					(error, stdout, stderr) => {
						if (error) throw new Error(error);
						if (stderr) throw new Error(stderr);
						debug && console.log(stdout);
					}
				);
			},
			skip: () => {
				if (!git)
					return 'Automatic git initialization not specified (--git)';
			}
		}
	];

	new Listr(tasks).run();
};

import copy from './copy.js';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { exec } from "child_process"

const __dirname = dirname(fileURLToPath(import.meta.url));

import Listr from 'listr';

export default ({ opts, answers }) => {
	let { install } = opts
	let { template, name } = answers

	let templatePath = path.join(__dirname, '..', 'templates', template);

	let tasks = [
		{
			title: 'Copy files',
			task: () => {
				copy(
					templatePath,
					path.join(process.cwd(), name),
					{
						name: name
					},
					true
				);
			}
		},
		{
			title: "Install Dependencies",
			task: (ctx, task) => {
				// if(yarn) {
				// 	exec(`cd ${templatePath} && yarn`, (error, stdout, stderr) => {
				// 		if(error) throw new Error("Yarn is not accesible. Install it or install dependencies with NPM.")
				// 		if(stderr) throw new Error(stderr)
				// 		console.log(stdout)
				// 	}) 

				// 	return
				// }

				exec(`cd ${templatePath} && npm install`, (error, stdout, stderr) => {
					if(error) throw new Error(error)
					if(stderr) throw new Error(stderr)
					console.log(stdout)
				})
			},
			skip: () => {
				if(!install) return "Automatic installation not specified (--install)"
			}
		}
	]

	new Listr(tasks).run();
}
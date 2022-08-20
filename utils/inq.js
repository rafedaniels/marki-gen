// let inquirer = require('inquirer');
import inquirer from 'inquirer';
let q = [];
let answers = {
	none: true
};

export default async (opts) => {
	let { interactive, install } = opts;
	interactive &&
		q.push(
			{
				type: 'confirm',
				name: 'install',
				message: 'Install dependencies by default?'
			},
			{
				type: 'confirm',
				name: 'git',
				message: 'Initialize git in the proyect',
				default: false
			}
			// {
			// 	type: 'confirm',
			// 	name: 'yarn',
			// 	message: 'Use yarn instead of NPM?'
			// }
		);

	install &&
		q.push({
			type: 'checkbox',
			name: 'deps',
			message: 'Extra dependencies to install (Suggested dependencies)',
			choices: [
				'ffmpeg',
				'mongoose',
				'mongodb',
				'quick.db',
				'@rafe.daniels.official/betterlogs',
				'betterlogs-discord',
				'mysql'
			]
		});

	q.push(
		{
			type: 'list',
			name: 'template',
			message: 'Choose a template',
			choices: ['wokcommands', 'express-ejs']
		},
		{
			name: 'name',
			message: 'Name of your proyect.',
			default: 'unnamed_proyect'
		},
		{
			name: 'version',
			message: 'Version of your proyect.',
			default: '0.0.0'
		}
	);

	await inquirer
		.prompt(q)
		.then((ans) => {
			answers = ans;
		})
		.catch((err) => {
			if (err.isTtyError)
				return console.log(
					'Your console/OS is not compatible with the script!'
				);

			console.log(err);
		});

	// opts.yarn = opts.yarn || answers.yarn
	opts.install = opts.install || answers.install;
	opts.git = opts.git || answers.git;

	answers = {
		answers,
		opts
	};

	return answers;
};

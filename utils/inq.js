// let inquirer = require('inquirer');
import inquirer from 'inquirer';
let q = [];
let answers = {
	none: true
};

export default async (opts) => {
	let { interactive } = opts
	console.log(interactive)
	interactive &&
		q.push(
			{
				type: 'confirm',
				name: 'install',
				message: 'Install dependencies by default?'
			}
			// {
			// 	type: 'confirm',
			// 	name: 'yarn',
			// 	message: 'Use yarn instead of NPM?'
			// }
		);

	q.push(
		{
			type: 'list',
			name: 'template',
			message: 'Choose a template',
			choices: ['discord', 'typescript']
		},
		{
			name: 'name',
			message: 'Name of your proyect.',
			default: 'unnamed_proyect'
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
	opts.install = opts.install || answers.install

	answers = {
		answers,
		opts
	}

	return answers;
};

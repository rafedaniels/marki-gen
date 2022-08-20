import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	install: {
		type: `boolean`,
		default: false,
		alias: `s`,
		desc: `Install dependencies by default`
	},
	yarn: {
		type: `boolean`,
		default: false,
		alias: `yn`,
		desc: `Use yarn package manager (instead of NPM)`
	},
	interactive: {
		type: `boolean`,
		default: false,
		alias: `i`,
		desc: `Prompt for options`
	},
	git: {
		type: `boolean`,
		default: false,
		alias: `g`,
		desc: `Initialize a git repository`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `m`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);

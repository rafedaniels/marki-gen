#!/usr/bin/env node

/**
 * marki
 * CLI to bootstrap my new proyects
 *
 * @author Rafael Soley <rsoley.com>
 */

// const init = require('./utils/init');
// const cli = require('./utils/cli.js');
// const log = require('./utils/log.js');

// const main = require('./utils/main.js');
// const inq = require('./utils/inq');

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';

import main from './utils/main.js';
import inq from './utils/inq.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	let opts = await inq(flags);
	let { name, template } = opts;

	main(opts);
})();

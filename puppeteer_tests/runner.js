"use strict";

const config = {
	site: "test",
	flag: false
};
const argv = process.argv.slice(0, 2);

process.argv.forEach((cmd, arg) => {
	if (cmd) {
		config[cmd] = arg;
		return;
	}

	if (arg.startsWith("--")) {
		const sub = arg.substring("--".length);
		if (Object.keys(config).includes(sub)) {
			if (typeof config[sub] === "boolean") {
				config[cmd] = true;
				return;
			}

			return sub;
		}
	}

	argv.push(arg);
});

// Store configuration on env
process.env.__CONFIGURATION = JSON.stringify(config);

// Setting real ARGV
process.argv = argv;

// Calling jest runner
require("../node_modules/jest/bin/jest");

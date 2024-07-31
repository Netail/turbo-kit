import { Workspace } from '@turbo/repository';
import { run } from 'npm-check-updates';
import path from 'node:path';
import chalk from 'chalk';

export const updates = async () => {
	const workspace = await Workspace.find('.');

	const packages = (await workspace.findPackages()).sort((a, b) =>
		a.relativePath.localeCompare(b.relativePath),
	);

	if (packages.length === 0) {
		console.warn('[Turbo Kit] - No packages found...');
		process.exit(1);
	}

	await packageUpdates('root', 'package.json');

	for (const pkg of packages) {
		await packageUpdates(
			pkg.name,
			path.join(pkg.relativePath, 'package.json'),
		);
	}
};

const packageUpdates = async (name: string, path: string) => {
	console.log(chalk.underline(chalk.bold(name)));

	const upgrades = await run({
		packageFile: path,
	});

	const depsLength = Object.keys(upgrades || {});
	if (upgrades && depsLength.length > 0) {
		Object.entries(upgrades).forEach(([key, value], idx) => {
			const isLast = depsLength.length === idx + 1;
			const prefix = isLast ? '└──' : '├──';

			console.log(`${prefix} ${key} >> ${value}${isLast ? '\n' : ''}`);
		});
	} else {
		console.log('└── none...\n');
	}
};

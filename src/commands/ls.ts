import { Workspace } from '@turbo/repository';
import { generateAsciiTree } from '@utils/ascii-tree';
import chalk from 'chalk';

export const list = async () => {
	const workspace = await Workspace.find('.');

	const packages = (await workspace.findPackages()).sort((a, b) =>
		a.relativePath.localeCompare(b.relativePath),
	);

	const paths = packages.map(
		(pkg) =>
			`${pkg.relativePath} / ${chalk.underline(chalk.bold(pkg.name))}`,
	);
	const tree = generateAsciiTree(paths);
	console.log(tree);
};

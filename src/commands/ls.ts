import { Workspace } from '@turbo/repository';
import { generateAsciiTree } from '@utils/ascii-tree';
import pc from 'picocolors';

export const list = async () => {
	const workspace = await Workspace.find('.');

	const packages = (await workspace.findPackages()).sort((a, b) =>
		a.relativePath.localeCompare(b.relativePath),
	);

	const paths = packages.map(
		(pkg) => `${pkg.relativePath} | ${pc.underline(pc.bold(pkg.name))}`,
	);
	const tree = generateAsciiTree(paths);
	console.log(tree);
};

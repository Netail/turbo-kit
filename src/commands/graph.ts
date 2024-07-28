import { Workspace, type PackageDetails } from '@turbo/repository';
import { underline, bold } from 'chalk';

const graph = async (key: keyof PackageDetails) => {
	const workspace = await Workspace.find('.');

	const packages = await workspace.findPackages();
	const packagesWithGraph = await workspace.findPackagesWithGraph();

	for (const pkg of packages) {
		const rawDependencies = packagesWithGraph[pkg.relativePath][key];
		const dependencies = rawDependencies.map(
			(rawDep) =>
				packages.find((pkg) => pkg.relativePath === rawDep)?.name,
		);

		console.log(underline(bold(pkg.name)));

		if (dependencies.length > 0) {
			dependencies.forEach((dep, idx) => {
				const isLast = dependencies.length === idx + 1;
				const prefix = isLast ? '└──' : '├──';

				console.log(`${prefix} ${dep}${isLast ? '\n' : ''}`);
			});
		} else {
			console.log('└── None...\n');
		}
	}
};

export const dependentsGraph = () => {
	graph('dependents');
};

export const dependenciesGraph = () => {
	graph('dependencies');
};

import { Workspace, type PackageDetails } from '@turbo/repository';
import pc from 'picocolors';

const graph = async (key: keyof PackageDetails) => {
	const workspace = await Workspace.find('.');

	const packages = (await workspace.findPackages()).sort((a, b) =>
		a.relativePath.localeCompare(b.relativePath),
	);
	const packagesWithGraph = await workspace.findPackagesWithGraph();

	for (const pkg of packages) {
		const rawDependencies = packagesWithGraph[pkg.relativePath][key].sort(
			(a, b) => a.localeCompare(b),
		);
		const dependencies = rawDependencies.map(
			(rawDep) =>
				packages.find((pkg) => pkg.relativePath === rawDep)?.name,
		);

		console.log(pc.underline(pc.bold(pkg.name)));

		if (dependencies.length > 0) {
			dependencies.forEach((dep, idx) => {
				const isLast = dependencies.length === idx + 1;
				const prefix = isLast ? '└──' : '├──';

				console.log(`${prefix} ${dep}${isLast ? '\n' : ''}`);
			});
		} else {
			console.log('└── none...\n');
		}
	}
};

export const dependentsGraph = () => {
	graph('dependents');
};

export const dependenciesGraph = () => {
	graph('dependencies');
};

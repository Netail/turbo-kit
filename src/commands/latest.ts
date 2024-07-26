import { Workspace } from '@turbo/repository';
import { readPackage } from '@utils/read-package';
import { fetchLatestVersion } from '@utils/fetch-latest-version';
import type { PackageJSON } from '@interfaces/package-json';

const cache = new Map<string, PackageJSON>();

export const latest = async () => {
	const workspace = await Workspace.find('.');

	const workspacePackages = await workspace.findPackages();
	const packages = workspacePackages
		.map((pkg) => {
			return readPackage(pkg.relativePath);
		})
		.filter((pkg) => !!pkg);

	if (packages.length === 0) {
		console.warn('[Turbo Kit] - No packages found...');
		process.exit(1);
	}

	for (const pkg of packages) {
		console.log(pkg.name);

		for (const [name, version] of [
			...Object.entries(pkg.dependencies || {}),
			...Object.entries(pkg.devDependencies || {}),
		]) {
			const latest = await getLatestPackage(name);

			console.log({ current: version, latest: latest?.version });
		}
	}
};

const getLatestPackage = async (pkg: string) => {
	const cachedPackage = cache.get(pkg);

	if (cachedPackage) return cachedPackage;

	const fetchedLatest = await fetchLatestVersion(pkg);

	if (fetchedLatest) {
		cache.set(pkg, fetchedLatest);
	}

	return fetchedLatest;
};

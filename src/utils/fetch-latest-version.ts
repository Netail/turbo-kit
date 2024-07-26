import type { PackageJSON } from '@interfaces/package-json';

export const fetchLatestVersion = async (pkg: string) => {
	try {
		const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`);

		if (res.ok) {
			const packageJSON = (await res.json()) as PackageJSON;
			return packageJSON;
		}

		throw new Error();
	} catch (err) {
		console.error(`[Turbo Kit] - Failed fetching latest version of ${pkg}`);
		return null;
	}
};

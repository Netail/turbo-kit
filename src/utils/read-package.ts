import path from 'node:path';
import fs from 'node:fs';
import type { PackageJSON } from '@interfaces/package-json';

export const readPackage = (pkg: string): PackageJSON | null => {
	const packagePath = path.join(process.cwd(), pkg, 'package.json');

	if (fs.existsSync(packagePath)) {
		try {
			const rawPackage = fs.readFileSync(packagePath, 'utf8');
			const parsedPackage = JSON.parse(rawPackage);

			return parsedPackage as PackageJSON;
		} catch (err) {
			console.error('[Turbo Kit] - Failed to read/parse package');
			return null;
		}
	}

	return null;
};

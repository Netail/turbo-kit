import { rmSync } from 'node:fs';

interface CleanProps {
	files: string[];
}

export const clean = ({ files }: CleanProps) => {
	for (const file of files) {
		try {
			rmSync(file, { recursive: true });
		} catch (err) {
			if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
				console.warn('Failed to delete file or directory:', file);
			} else {
				throw err;
			}
		}
	}
};

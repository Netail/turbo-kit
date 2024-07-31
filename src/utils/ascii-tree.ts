type TreeNode = {
	[key: string]: TreeNode | null;
};

/**
 * Copied from
 * https://github.com/BuilderIO/micro-agent/blob/main/src/helpers/generate-ascii-tree.ts
 */
export const generateAsciiTree = (paths: string[]): string => {
	const root: TreeNode = {};

	// Construct the tree
	for (const path of paths) {
		const parsedPath = path.split(' | ');
		const parts = parsedPath.shift()?.split(/\/|\\/g) || [];

		if (parsedPath.length > 0) {
			const lastItem = parts.pop();
			parts.push(`${lastItem} | ${parsedPath}`);
		}

		let current = root;

		parts.forEach((part, index) => {
			if (!current[part]) {
				current[part] = index === parts.length - 1 ? null : {};
			}
			current = current[part] as TreeNode;
		});
	}

	// Function to generate ASCII tree
	const generateTreeString = (node: TreeNode, prefix = ''): string => {
		const keys = Object.keys(node);
		let result = '';

		keys.forEach((key, index) => {
			const isThisLast = index === keys.length - 1;
			result += `${prefix + (isThisLast ? '└── ' : '├── ') + key}\n`;

			// Generate subtree if the current node is a directory
			if (node[key]) {
				result += generateTreeString(
					node[key] as TreeNode,
					prefix + (isThisLast ? '    ' : '│   '),
				);
			}
		});

		return result;
	};

	return generateTreeString(root).trim();
};

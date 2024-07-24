type DependencyList = Record<string, string>;

export interface PackageJSON {
    name: string;
    version: string;
    dependencies?: DependencyList;
    devDependencies?: DependencyList;
    peerDependencies?: DependencyList;
    optionalDependencies?: DependencyList;
}

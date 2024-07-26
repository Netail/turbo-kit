#!/usr/bin/env node

import { Command } from 'commander';
import { clean } from '../commands/clean';
import { latest } from '../commands/latest';
import { dependenciesGraph, dependentsGraph } from '../commands/graph';

const program = new Command();

program.name('Turbo Kit').description('Turborepo CLI for housekeeping');

program
	.command('clean')
	.description('Cross env clean workspace')
	.argument('[files...]', 'Delete a file or directory cross environment')
	.action((files) => clean({ files }));

program
	.command('latest')
	.description('Check if versions of workspaces are up to date')
	.action(() => latest());

program
	.command('dependencies')
	.description('Display Turbo monorepo dependencies graph')
	.action(() => dependenciesGraph());

program
	.command('dependents')
	.description('Display Turbo monorepo dependents graph')
	.action(() => dependentsGraph());

program.parse();

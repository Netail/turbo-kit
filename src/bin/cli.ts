#!/usr/bin/env node

import { Command } from 'commander';
import { clean } from '../commands/clean';
import { updates } from '../commands/updates';
import { dependenciesGraph, dependentsGraph } from '../commands/graph';
import { list } from '../commands/ls';

const program = new Command();

program.name('Turbo Kit').description('Turborepo CLI for housekeeping');

program
	.command('clean')
	.description('Delete a file or directory cross environment')
	.argument('[files...]', 'Files or directories to be deleted')
	.action((files) => clean({ files }));

program
	.command('updates')
	.description('Check if the dependencies of the workspace are up to date')
	.action(() => updates());

program
	.command('dependencies')
	.description('Display Turbo monorepo dependencies graph')
	.action(() => dependenciesGraph());

program
	.command('dependents')
	.description('Display Turbo monorepo dependents graph')
	.action(() => dependentsGraph());

program
	.command('ls')
	.description('Display all Turbo repo packages')
	.action(() => list());

program.parse();

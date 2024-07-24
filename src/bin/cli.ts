#!/usr/bin/env node

import { Command } from 'commander';
import { clean } from '../commands/clean';
import { latest } from '../commands/latest';

const program = new Command();

program
    .name('Turbo Kit')
    .description('Turborepo CLI for housekeeping');

program
    .command('clean')
    .description('Cross env clean workspace')
    .argument('[files...]', 'extra files to be deleted')
    .action((name, options, command) => clean(options.files));

program
    .command('latest')
    .description('Check if versions of workspaces are up to date')
    .action(() => latest());

program.parse();

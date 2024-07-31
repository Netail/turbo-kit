# Turbo Kit

Turborepo CLI for housekeeping

## Installation

```sh
npm install turbo-kit -D
```

```sh
yarn add turbo-kit -D
```

```sh
pnpm add turbo-kit -D
```

## Usage

```sh
Usage: turbo-kit [options] [command]

Options:
  -h, --help        display help for command

Commands:
  clean [files...]  Cross env clean workspace
  dependencies      Display Turbo monorepo dependencies graph     
  dependents        Display Turbo monorepo dependents graph
  ls                Display all Turbo repo packages
  updates           Check if the dependencies of the workspace are up to date
  help [command]    display help for command
```

## Commands

### `clean`

Rimraf files cross environment (window/macos/linux)

### `dependencies`

Display a graph of dependencies within the monorepo.

### `dependents`

Display a graph of dependents within the monorepo.

### `ls`

List all the packages in the monorepo

### `updates`

Check if the dependencies of the workspace are up to date

<div align="center">
  <img alt="auto-cli logo" width="120" height="120" src="./logo.png">
  <h1>auto-cli</h1>
  <span>English | <a href="./README.zh-CN.md">中文</a></span>
</div>

# Introduction
An automated release workflow based on vite + vue-tsc + changelogen, including build, type checking, and version management.

## Quick Start

Install dependencies

```sh
pnpm i @stellaround/auto-cli -D
```

Execute the automated release workflow

```sh
auto-cli
```

## Recommendations
If you are using this tool as a team, make sure to use the --sync-tags option to enable team sync of git tags. Otherwise, you may encounter a bug where the changelog is generated from the initial version to the latest version.

## Notes
This automated workflow depends on the vite, vue-tsc, and changelogen packages. Please ensure these packages are already installed in your project.

## License

[Apache](./LICENSE)

Copyright (c) 2024-present [spectature](https://github.com/Spectature)
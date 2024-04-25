<div align="center">
  <img alt="auto-cli logo" width="120" height="120" src="./logo.png">
  <h1>auto-cli</h1>
  <span><a href="./README.md">English</a> | 中文</span>
</div>

# 简介
基于vite + vue-tsc + changelogen的自动化发版流程，其中包含构建、类型检查和版本管理。

## 快速开始

安装依赖

```sh
pnpm i @stellaround/auto-cli -D
```

执行自动化发版流程

```sh
auto-cli
```

## 建议
如果您是团队使用，务必确保使用`--sync-tags`参数来开启git tag的团队内同步，否则changelog会出现从初始版本到最新全部生成的bug。

## 注意事项
该自动化流程依赖vite、vue-tsc、changelogen包，请确保这些包在您的项目中已经被安装。

## License

[Apache](./LICENSE)

Copyright (c) 2024-present [spectature](https://github.com/Spectature)
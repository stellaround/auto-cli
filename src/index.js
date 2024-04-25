#!/usr/bin/env node

import prompt from "prompts";
import chalk from "chalk";
import { execa } from "execa";

const main = async () => {
  let needPushTag = false;
  const args = process.argv.slice(2);
  if (args.includes("--sync-tags")) {
    needPushTag = true;
  }

  const { versionType } = await prompt([
    {
      type: "select",
      name: "versionType",
      message: "请选择发布版本类型",
      choices: [
        {
          title: "修订版本",
          description: "修订更新是一种用于修复现有错误的更新，它具有向下兼容性",
          value: "patch",
        },
        {
          title: "次要版本",
          description: "次要更新是指引入新功能的更新，它也向下兼容。",
          value: "minor",
        },
        {
          title: "主要版本",
          description:
            "主要更新与前几种更新有很大不同，因为它不向下兼容（也就是说，升级到新的主要版本会引入破坏性更改，可能会导致以前版本的代码被破坏）",
          value: "major",
        },
      ],
    },
  ]);

  if (!versionType) {
    console.log(chalk.hex("#F56C6C")("请选择版本类型 !"));
    process.exit(1);
  }

  // type check
  try {
    console.log(chalk.hex("#409EFF")("类型检查中 ..."));
    await execa("vue-tsc", ["--build", "--force"]);
    console.log(chalk.hex("#55D187")("类型检查成功"));
  } catch (e) {
    console.log(e);
    console.log(chalk.hex("#F56C6C")("类型检查失败 !"));
    process.exit(1);
  }

  // build dist
  try {
    console.log(chalk.hex("#409EFF")("构建中 ..."));
    await execa("vite", ["build"]);
    console.log(chalk.hex("#55D187")("构建成功"));
  } catch (e) {
    console.log(e);
    console.log(chalk.hex("#F56C6C")("构建失败 !"));
    process.exit(1);
  }

  // generate changelog
  try {
    console.log(chalk.hex("#409EFF")("生成changelog中 ..."));
    await execa("changelogen", ["--bump", "--release"]);
    console.log(chalk.hex("#55D187")("生成changelog成功"));
  } catch (e) {
    console.log(e);
    console.log(chalk.hex("#F56C6C")("生成changelog失败 !"));
    process.exit(1);
  }

  // 推送tag
  try {
    if (needPushTag) {
      await execa("git", ["push", "origin", "--tags"]);
    }
  } catch (e) {
    console.log(e);
    console.log(chalk.hex("#F56C6C")("推送tags失败"));
    process.exit(1);
  }

  // push
  try {
    console.log(chalk.hex("#409EFF")("推送中 ..."));
    await execa("git", ["push"]);
    console.log(chalk.hex("#55D187")("推送成功"));
  } catch (e) {
    console.log(e);
    console.log(chalk.hex("#F56C6C")("推送失败 !"));
    process.exit(1);
  }
};

main().then(() => {
  // 成功
});

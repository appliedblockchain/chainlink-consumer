import * as fs from "fs";
import path from "path";
import { extendConfig, task } from "hardhat/config";

import { HardhatPluginError } from "hardhat/plugins";

import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";

import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    bytecodeExporter?: {
      path?: string;
      clear?: boolean;
      flat?: boolean;
      only?: string[];
      except?: string[];
      spacing?: number;
    };
  }

  interface HardhatConfig {
    bytecodeExporter: {
      path: string;
      clear: boolean;
      flat: boolean;
      only: string[];
      except: string[];
      spacing: number;
    };
  }
}

extendConfig(function (config, userConfig) {
  config.bytecodeExporter = Object.assign(
    {
      path: "./bytecode",
      clear: false,
      flat: false,
      only: [],
      except: [],
      spacing: 2,
    },
    userConfig.bytecodeExporter
  );
});

task(TASK_COMPILE, async function (args, hre, runSuper) {
  const config = hre.config.bytecodeExporter;

  await runSuper();

  const outputDirectory = path.resolve(hre.config.paths.root, config.path);

  if (!outputDirectory.startsWith(hre.config.paths.root)) {
    throw new HardhatPluginError(
      "resolved path must be inside of project directory"
    );
  }

  if (outputDirectory === hre.config.paths.root) {
    throw new HardhatPluginError("resolved path must not be root directory");
  }

  if (config.clear) {
    if (fs.existsSync(outputDirectory)) {
      fs.rmdirSync(outputDirectory, { recursive: true });
    }
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  for (const fullName of await hre.artifacts.getAllFullyQualifiedNames()) {
    if (
      config.only &&
      config.only.length &&
      !config.only.some((m) => fullName.match(m))
    )
      continue;
    if (
      config.except &&
      config.except.length &&
      config.except.some((m) => fullName.match(m))
    )
      continue;

    const { bytecode, sourceName, contractName } =
      await hre.artifacts.readArtifact(fullName);

    if (!bytecode.length || bytecode === "0x") continue;

    const destination =
      path.resolve(
        outputDirectory,
        config.flat ? "" : sourceName,
        contractName
      ) + ".json";

    if (!fs.existsSync(path.dirname(destination))) {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
    }

    fs.writeFileSync(
      destination,
      `${JSON.stringify(bytecode, null, config.spacing)}\n`,
      { flag: "w" }
    );
  }
});

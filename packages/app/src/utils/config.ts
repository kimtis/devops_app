import fs from "fs";
import YAML from "yaml";
import * as cv from "class-validator";
import * as ct from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

import LoggerFactory from "./logger";
const logger = LoggerFactory.getLogger(__filename);

class Server {
  @cv.IsInt()
  readonly port: number = 5000;
}

export default class Config {
  private static instance: Config;
  readonly server: Server;

  private constructor(configFile: string = "./app.yaml") {
    logger.info(`Loading configuration file, filename=${configFile}`);
    const conf = YAML.parse(fs.readFileSync(configFile, "utf-8"));
    this.server = Config.validate(Server, conf.server);
    logger.info(`Completed loading of configuration file, filename=${configFile}`);
  }

  private static validate<T, V>(cls: ClassType<T>, obj: V): T {
    const trans = ct.plainToClass(cls, obj);
    const invalids = cv.validateSync(trans);
    if (invalids.length > 0)
      throw new TypeError(invalids[0].toString());
    return trans;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config(process.env.CONFIG_FILE);
    }
    return Config.instance;
  }
}

import log4js, { Logger, Level } from 'log4js';
import promClient from 'prom-client';
import path from 'path';

const metrics = new promClient.Gauge({
  name: 'log4js_events',
  help: 'Number of each level log events',
  labelNames: ['level']
});

log4js.configure({
  appenders: { default: { type: "stdout" } },
  categories: { default: { appenders: ["default"], level: "info" } }
});

log4js.levels.levels.forEach((level: Level) => {
  const levelStr = level.toString().toLowerCase();
  metrics.labels(levelStr).set(0);
});

export default class LogFactory {

  static getLogger(name: string): Logger {
    const logger = log4js.getLogger(path.basename(name));
    const origin = logger._log.bind(logger);
    logger._log = function (level: string, data: any) {
      const levelStr = level.toString().toLowerCase();
      metrics.labels('all').inc();
      metrics.labels(levelStr).inc();
      return origin(level, data);
    };
    return logger;
  }

  static connect(name: string): any {
    const logger = this.getLogger(name);
    const option = {
      format: '":method :url HTTP/:http-version" :status :content-length',
      level: 'auto',
      nolog: '"\\.ico"'
    }
    return log4js.connectLogger(logger, option);
  }
};

import http from "http";
import Koa from "koa";
import respond from "koa-respond";
import cors from "@koa/cors";
import bodyparser from "koa-bodyparser";
import { scopedPerRequest, loadController } from "awilix-koa";

import authenticate from "./auth/authenticate";
import accessControl from "./auth/accessControl";
import httpLogger from "./logger/httpLogger";
import errorLogger from "./errors/errorHandler";
import cache from "./cache/httpCache";
import notFoundHandler from "./errors/notFoundHandler";

class Server {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
    this.app = new Koa();
    this.app.keys = [this.config.secret];
  }

  async create(container) {
    this.app
      .use(errorHandler)
      .use(respond)
      .use(cors({ credentials: true }))
      .use(bodyparser())
      .use(scopedPerRequest(container))
      .use(httpLogger(this.logger))
      .use(authenticate)
      .use(cache)
      .use(accessControl.protect)
      .use(loadController("./routes/*.js", { cwd: __dirname }))
      .use(notFoundHandler);

    return http.createServer(this.app.callback());
  }

  async start(container) {
    const appServer = await this.create(container).catch(error => {
      this.logger.error("Error while starting up server ", error);
      process.exit(1);
    });

    appServer &&
      appServer.listen(this.config.server.port, () => {
        this.logger.info("App is running");
      });
  }
}

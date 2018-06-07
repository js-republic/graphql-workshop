const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const service = require("./service");
const loggerConf = require("./logger-conf");
const restRouter = require("./route/rest");
const graphQlRouter = require("./route/graphql");

const app = express();
const port = process.env.PORT || 3001;
const expressLogger = loggerConf.expressLogger;
const logger = loggerConf.logger;

app.use(expressLogger);
app.use(compression());
app.use(bodyParser.json());

app.use("/rest", restRouter);
app.use("/graphql", graphQlRouter);

service
  .onReady()
  .then(() =>
    app.listen(port, () => {
      logger.info(`App listen on ${port}`);
    })
  )
  .catch(err => logger.error(`Database cannot be opened. Reason :\n${err}`));

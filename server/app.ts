import cors from 'cors';
import debug from 'debug';
import express from 'express';
import * as expressWinston from 'express-winston';
import * as http from 'http';
import * as winston from 'winston';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// Configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
});

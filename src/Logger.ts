import winston from "winston";

export const ServerLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "server-logs" },
  transports: [new winston.transports.Console()],
});

export const FileWatcherLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "file-watcher" },
  transports: [new winston.transports.Console()],
});

export const FileUploaderLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "file-uploader" },
  transports: [new winston.transports.Console()],
});

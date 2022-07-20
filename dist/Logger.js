"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderLogger = exports.FileWatcherLogger = exports.ServerLogger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.ServerLogger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "server-logs" },
    transports: [new winston_1.default.transports.Console()],
});
exports.FileWatcherLogger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "file-watcher" },
    transports: [new winston_1.default.transports.Console()],
});
exports.FileUploaderLogger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "file-uploader" },
    transports: [new winston_1.default.transports.Console()],
});
//# sourceMappingURL=Logger.js.map
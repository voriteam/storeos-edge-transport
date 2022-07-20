"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboundFileWatcher = exports.OutboundFileWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const Datasource_1 = require("./Datasource");
const ITRetailOutboundFile_1 = require("./ITRetailOutboundFile");
const Logger_1 = require("./Logger");
const IMPORT_DIR = __dirname + "/itretail_inbound";
const EXPORT_DIR = __dirname + "/itretail_outbound";
const STORE_ID = "TEST_STORE_ID";
class OutboundFileWatcher {
    /**
     * Watch for files exported by ITRetail that need to be sent to
     * Vori cloud.
     *
     * On file add:
     * 1. Write file data to DB (enqueue)
     */
    watch() {
        chokidar_1.default
            .watch(EXPORT_DIR, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
        })
            .on("ready", () => {
            Logger_1.FileWatcherLogger.info(`Watching files at ${EXPORT_DIR}`);
        })
            .on("all", async (event, filepath) => {
            if (event == "add") {
                const extension = ITRetailOutboundFile_1.ITRetailOutboundFile.getExtension(filepath);
                if (extension !== ".ITRXML") {
                    return;
                }
                const file = ITRetailOutboundFile_1.ITRetailOutboundFile.create(filepath);
                Logger_1.FileWatcherLogger.info(`New ITR file at: ${file.fileName}`);
                await Datasource_1.datasource.getRepository(ITRetailOutboundFile_1.ITRetailOutboundFile).upsert(file, {
                    conflictPaths: ["fileName"],
                });
            }
        });
    }
}
exports.OutboundFileWatcher = OutboundFileWatcher;
class InboundFileWatcher {
    /**
     * Watch for ITRetail acks that a file has been processed.
     *
     * On Ack:
     * 1. Write response to db
     * 2. send response to Vori
     */
    watchAcknowledgments() {
        chokidar_1.default
            .watch(EXPORT_DIR, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
        })
            .on("all", (event, path) => {
            console.log(event, path);
        });
    }
}
exports.InboundFileWatcher = InboundFileWatcher;
//# sourceMappingURL=FileWatcher.js.map
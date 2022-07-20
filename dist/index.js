"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const Logger_1 = require("./Logger");
const FileWatcher_1 = require("./FileWatcher");
const server = (0, fastify_1.fastify)({});
const Datasource_1 = require("./Datasource");
const FileUploader_1 = require("./FileUploader");
/*
 * ENVIRONMENT/CONFIGURATION VARIABLES
 */
const PORT = 8080;
// TODO point this at the right ITRetail directories
const start = async () => {
    try {
        await server.listen({
            port: PORT,
        });
        const conn = await Datasource_1.datasource.initialize();
        Logger_1.ServerLogger.info(`Initialized db connection`);
        Logger_1.ServerLogger.info("Server started on port 8080");
        const watcher = new FileWatcher_1.OutboundFileWatcher();
        watcher.watch();
        const uploader = new FileUploader_1.FileUploader();
        uploader.scheduleUpload();
    }
    catch (err) {
        Logger_1.ServerLogger.error(`Server failed to start: ${err}`);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map
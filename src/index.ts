import { fastify } from "fastify";

import { ServerLogger } from "./Logger";
import { OutboundFileWatcher } from "./FileWatcher";
const server = fastify({});
import { datasource } from "./Datasource";
import { FileUploader } from "./FileUploader";

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

    const conn = await datasource.initialize();
    ServerLogger.info(`Initialized db connection`);

    ServerLogger.info("Server started on port 8080");

    const watcher = new OutboundFileWatcher();
    watcher.watch();

    const uploader = new FileUploader();
    uploader.scheduleUpload();
  } catch (err) {
    ServerLogger.error(`Server failed to start: ${err}`);
    process.exit(1);
  }
};
start();

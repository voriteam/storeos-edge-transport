import chokidar from "chokidar";

import { datasource } from "./Datasource";
import { ITRetailInboundFile } from "./ITRetailInboundFile";
import { ITRetailOutboundFile } from "./ITRetailOutboundFile";
import { FileWatcherLogger } from "./Logger";

const IMPORT_DIR = __dirname + "/itretail_inbound";
const EXPORT_DIR = __dirname + "/itretail_outbound";

const STORE_ID = "TEST_STORE_ID";

export class OutboundFileWatcher {
  /**
   * Watch for files exported by ITRetail that need to be sent to
   * Vori cloud.
   *
   * On file add:
   * 1. Write file data to DB (enqueue)
   */
  watch(): void {
    chokidar
      .watch(EXPORT_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      })
      .on("ready", () => {
        FileWatcherLogger.info(`Watching files at ${EXPORT_DIR}`);
      })
      .on("all", async (event, filepath) => {
        if (event == "add") {
          const extension = ITRetailOutboundFile.getExtension(filepath);
          if (extension !== ".ITRXML") {
            return;
          }

          const file = ITRetailOutboundFile.create(filepath);

          FileWatcherLogger.info(`New ITR file at: ${file.fileName}`);
          await datasource.getRepository(ITRetailOutboundFile).upsert(file, {
            conflictPaths: ["fileName"],
          });
        }
      });
  }
}

export class InboundFileWatcher {
  /**
   * Watch for ITRetail acks that a file has been processed.
   *
   * On Ack:
   * 1. Write response to db
   * 2. send response to Vori
   */
  watchAcknowledgments(): void {
    chokidar
      .watch(EXPORT_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      })
      .on("all", (event, path) => {
        console.log(event, path);
      });
  }
}

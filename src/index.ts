import { fastify } from "fastify";
import { ImportFile } from "./ImportFile";
import database from "./Database";
import chokidar from "chokidar";
const server = fastify({});

const port = 8080;

const STORE_ID = "TEST_STORE_ID";

// TODO point this at the right ITRetail directories
// IMPORT/EXPORT is relative to Vori, not ITRetail
const IMPORT_DIR = __dirname + "/../itretail_import";
const EXPORT_DIR = __dirname + "/../itretail_export";

const start = async () => {
  try {
    await server.listen({
      port: 8080,
    });
    console.log("Server started on port 8080");
    console.log(IMPORT_DIR);

    database.initialize();

    await chokidar
      .watch(IMPORT_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      })
      .on("all", (event, path) => {
        if (event == "add") {
          const file = new ImportFile(path);
          console.log(event, path);

          console.log(file.isITRFile());

          if (file.isITRFile()) {
            console.log(`Detected new ITR file at: ${path}`);
          }
        }
      });

    await chokidar
      .watch(EXPORT_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      })
      .on("all", (event, path) => {
        console.log(event, path);
      });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();

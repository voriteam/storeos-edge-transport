import { fastify } from "fastify";
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

    chokidar
      .watch(IMPORT_DIR, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
      })
      .on("all", (event, path) => {
        console.log(event, path);
      });

    chokidar
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

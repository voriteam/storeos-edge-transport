"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const ImportFile_1 = require("./ImportFile");
const Database_1 = __importDefault(require("./Database"));
const chokidar_1 = __importDefault(require("chokidar"));
const server = (0, fastify_1.fastify)({});
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
        Database_1.default.initialize();
        await chokidar_1.default
            .watch(IMPORT_DIR, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
        })
            .on("all", (event, path) => {
            if (event == "add") {
                const file = new ImportFile_1.ImportFile(path);
                console.log(event, path);
                console.log(file.isITRFile());
                if (file.isITRFile()) {
                    console.log(`Detected new ITR file at: ${path}`);
                }
            }
        });
        await chokidar_1.default
            .watch(EXPORT_DIR, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
        })
            .on("all", (event, path) => {
            console.log(event, path);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map
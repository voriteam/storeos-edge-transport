"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("itretail-sync", {
    verbose: console.log,
});
class DatabaseAccessor {
    initialize() {
        const exists = db.pragma(`table_info(import_files)`);
        if (exists.length === 0) {
            console.log("Initializing SQLite Table: import_files");
            const stmt = db.prepare("CREATE TABLE import_files (info TEXT)");
            const result = stmt.run();
        }
        else {
            console.log("Table import_files exists. Skipping initialization...");
        }
    }
    registerFile(filePath) {
        const stmt = db.prepare("INSERT INTO import_files VALUES (?)");
        const result = stmt.run(filePath);
        console.log(result);
        return result;
    }
    getFiles() {
        const stmt = db.prepare("SELECT * from import_files");
        const res = stmt.all();
        return res;
    }
    getFileFromPath(path) {
        const stmt = db.prepare("SELECT * from import_files WHERE PATH = (?)");
        const res = stmt.get(path);
        console.log(res);
        if (res) {
            return res;
        }
        return null;
    }
}
const database = new DatabaseAccessor();
exports.default = database;
//# sourceMappingURL=Database.js.map
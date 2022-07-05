import sqlite from "better-sqlite3";

const db = new sqlite("itretail-sync", {
  verbose: console.log,
});

type File = {
  path: string;
};

class DatabaseAccessor {
  initialize(): void {
    const exists = db.pragma(`table_info(import_files)`);
    if (exists.length === 0) {
      console.log("Initializing SQLite Table: import_files");
      const stmt = db.prepare("CREATE TABLE import_files (info TEXT)");
      const result = stmt.run();
    } else {
      console.log("Table import_files exists. Skipping initialization...");
    }
  }

  registerFile(filePath: string): number {
    const stmt = db.prepare("INSERT INTO import_files VALUES (?)");
    const result = stmt.run(filePath);
    console.log(result);
    return result;
  }

  getFiles(): any[] {
    const stmt = db.prepare("SELECT * from import_files");
    const res = stmt.all();
    return res;
  }

  getFileFromPath(path: string): File | null {
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
export default database;

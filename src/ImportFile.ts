import path from "path";
import database from "./Database";

const ITR_FILE_EXTENSION = ".ITRXML";

export class ImportFile {
  filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
  }

  getFileName(): string {
    return this.filepath;
  }

  getFileExtension(): string {
    return path.extname(this.filepath);
  }

  isITRFile(): boolean {
    if (this.getFileExtension() == ITR_FILE_EXTENSION) {
      return true;
    }

    return false;
  }

  exists(): boolean {
    const file = database.getFileFromPath(this.filepath);
    if (file) {
      return true;
    }

    return false;
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportFile = void 0;
const path_1 = __importDefault(require("path"));
const Database_1 = __importDefault(require("./Database"));
const ITR_FILE_EXTENSION = ".ITRXML";
class ImportFile {
    constructor(filepath) {
        this.filepath = filepath;
    }
    getFileName() {
        return this.filepath;
    }
    getFileExtension() {
        return path_1.default.extname(this.filepath);
    }
    isITRFile() {
        if (this.getFileExtension() == ITR_FILE_EXTENSION) {
            return true;
        }
        return false;
    }
    exists() {
        const file = Database_1.default.getFileFromPath(this.filepath);
        if (file) {
            return true;
        }
        return false;
    }
}
exports.ImportFile = ImportFile;
//# sourceMappingURL=ImportFile.js.map
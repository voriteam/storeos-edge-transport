"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ITRetailOutboundFile_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITRetailOutboundFile = void 0;
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
let ITRetailOutboundFile = ITRetailOutboundFile_1 = class ITRetailOutboundFile {
    static getExtension(filepath) {
        return path_1.default.extname(filepath);
    }
    static create(filepath) {
        const fileName = filepath.split("/").slice(-1)[0];
        const newFile = new ITRetailOutboundFile_1();
        newFile.processID = (0, crypto_1.randomUUID)();
        newFile.filePath = filepath;
        newFile.fileName = fileName;
        newFile.extension = this.getExtension(filepath);
        const nameparts = fileName.split("_");
        const timestamp = nameparts[nameparts.length - 1];
        const date = moment_1.default.utc(timestamp, "YYMMDDHHmm");
        newFile.fileTime = date.toISOString();
        newFile.collectionName = nameparts[2];
        return newFile;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ITRetailOutboundFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "processID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "collectionName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "fileTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "PENDING" }),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], ITRetailOutboundFile.prototype, "updatedAt", void 0);
ITRetailOutboundFile = ITRetailOutboundFile_1 = __decorate([
    (0, typeorm_1.Entity)("it_retail_outbound_files")
], ITRetailOutboundFile);
exports.ITRetailOutboundFile = ITRetailOutboundFile;
//# sourceMappingURL=ITRetailOutboundFile.js.map
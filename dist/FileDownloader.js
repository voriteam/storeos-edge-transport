"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownloader = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Config_1 = require("./Config");
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const Datasource_1 = require("./Datasource");
const ITRetailOutboundFile_1 = require("./ITRetailOutboundFile");
const Logger_1 = require("./Logger");
class FileDownloader {
    constructor() {
        this.isUploadJobRunning = false;
    }
    setJobRunning(val) {
        this.isUploadJobRunning = val;
    }
    scheduleUpload() {
        node_cron_1.default.schedule("* * * * *", async () => {
            if (this.isUploadJobRunning) {
                Logger_1.FileUploaderLogger.info(`Overlapping job detected. Skipping...`);
                return;
            }
            this.isUploadJobRunning = true;
            Logger_1.FileUploaderLogger.info(`Initiating upload to SFTP`);
            const [files, count] = await Datasource_1.datasource
                .getRepository(ITRetailOutboundFile_1.ITRetailOutboundFile)
                .findAndCountBy({
                status: "PENDING",
            });
            Logger_1.FileUploaderLogger.info(`Uploading ${count} files...`);
            for (const file of files) {
                Logger_1.FileUploaderLogger.info(`Uploading ${file.fileName}`);
                await this.uploadFile(file);
                file.status = "SENT";
                await Datasource_1.datasource.getRepository(ITRetailOutboundFile_1.ITRetailOutboundFile).save(file);
            }
            this.isUploadJobRunning = false;
        });
    }
    async uploadFile(file) {
        const config = (0, Config_1.getConfig)();
        return new Promise((resolve, reject) => {
            const sftp = new ssh2_sftp_client_1.default();
            sftp
                .connect({
                host: config.sftp.host,
                username: config.sftp.sftpUser,
                password: config.sftp.sftpPassword,
            })
                .then(() => {
                return sftp.fastPut(file.filePath, `/remote-dir/${file.fileName}`);
            })
                .then((data) => {
                Logger_1.FileUploaderLogger.info(data);
            })
                .then(() => {
                sftp.end();
                resolve();
            })
                .catch((err) => {
                Logger_1.FileUploaderLogger.error(`Error uploading file: ${err}`);
                reject(err);
            });
        });
    }
}
exports.FileDownloader = FileDownloader;
//# sourceMappingURL=FileDownloader.js.map
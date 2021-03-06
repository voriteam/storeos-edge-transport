"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const Config_1 = require("./Config");
const Logger_1 = require("./Logger");
class FileUploader {
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
            this.isUploadJobRunning = false;
        });
    }
    async listFiles() {
        return new Promise((resolve, reject) => {
            let files = [];
            const config = (0, Config_1.getConfig)();
            const sftp = new ssh2_sftp_client_1.default();
            sftp
                .connect({
                host: config.sftp.host,
                username: config.sftp.sftpUser,
                password: config.sftp.sftpPassword,
            })
                .then(() => {
                return sftp.list(config.itrInboundPath);
            })
                .then((data) => {
                console.log(data);
                files = data;
                // FileUploaderLogger.info(data);
            })
                .then(() => {
                sftp.end();
                resolve(files);
            })
                .catch((err) => {
                Logger_1.FileUploaderLogger.error(`Error uploading file: ${err}`);
                reject(err);
            });
        });
    }
    async downloadFile(file) {
        return new Promise((resolve, reject) => {
            const config = (0, Config_1.getConfig)();
            const sftp = new ssh2_sftp_client_1.default();
            sftp
                .connect({
                host: config.sftp.host,
                username: config.sftp.sftpUser,
                password: config.sftp.sftpPassword,
            })
                .then(() => {
                return sftp.fastGet("", "");
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
exports.FileUploader = FileUploader;
//# sourceMappingURL=FileUploader.js.map
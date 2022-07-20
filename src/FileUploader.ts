import cron from "node-cron";

import Client, { FileInfo } from "ssh2-sftp-client";
import { getConfig } from "./Config";
import { ITRetailInboundFile } from "./ITRetailInboundFile";

import { ITRetailOutboundFile } from "./ITRetailOutboundFile";
import { FileUploaderLogger } from "./Logger";

export class FileUploader {
  isUploadJobRunning: boolean = false;

  setJobRunning(val: boolean): void {
    this.isUploadJobRunning = val;
  }

  scheduleUpload(): void {
    cron.schedule("* * * * *", async () => {
      if (this.isUploadJobRunning) {
        FileUploaderLogger.info(`Overlapping job detected. Skipping...`);
        return;
      }

      this.isUploadJobRunning = true;
      FileUploaderLogger.info(`Initiating upload to SFTP`);

      this.isUploadJobRunning = false;
    });
  }

  async listFiles(): Promise<FileInfo[]> {
    return new Promise<FileInfo[]>((resolve, reject) => {
      let files: FileInfo[] = [];
      const config = getConfig();
      const sftp = new Client();
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
          FileUploaderLogger.error(`Error uploading file: ${err}`);
          reject(err);
        });
    });
  }

  async downloadFile(file: ITRetailInboundFile): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const config = getConfig();
      const sftp = new Client();
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
          FileUploaderLogger.info(data);
        })
        .then(() => {
          sftp.end();
          resolve();
        })
        .catch((err) => {
          FileUploaderLogger.error(`Error uploading file: ${err}`);
          reject(err);
        });
    });
  }
}

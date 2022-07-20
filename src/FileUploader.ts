import cron from "node-cron";

import Client from "ssh2-sftp-client";

import { datasource } from "./Datasource";
import { ITRetailOutboundFile } from "./ITRetailOutboundFile";
import { FileUploaderLogger } from "./Logger";

const SFTPCredentials = {
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
};

const credentials = {
  host: "data.sftp.us.stedi.com",
  username: SFTPCredentials.username,
  password: SFTPCredentials.password,
};

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

      const [files, count] = await datasource
        .getRepository(ITRetailOutboundFile)
        .findAndCountBy({
          status: "PENDING",
        });

      FileUploaderLogger.info(`Uploading ${count} files...`);

      for (const file of files) {
        FileUploaderLogger.info(`Uploading ${file.fileName}`);
        await this.uploadFile(file);

        file.status = "SENT";
        await datasource.getRepository(ITRetailOutboundFile).save(file);
      }
      this.isUploadJobRunning = false;
    });
  }

  async uploadFile(file: ITRetailOutboundFile): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sftp = new Client();
      sftp
        .connect(credentials)
        .then(() => {
          return sftp.fastPut(file.filePath, `/remote-dir/${file.fileName}`);
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

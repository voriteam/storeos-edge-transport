import { randomUUID } from "crypto";

import path from "path";
import moment from "moment";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("it_retail_outbound_files")
export class ITRetailOutboundFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  processID: string;

  @Column()
  filePath: string;

  @Column({ unique: true })
  fileName: string;

  @Column()
  collectionName: string;

  @Column()
  fileTime: string;

  @Column()
  extension: string;

  // PENDING | SENT
  @Column({ default: "PENDING" })
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  static getExtension(filepath: string): string {
    return path.extname(filepath);
  }

  static create(filepath: string): ITRetailOutboundFile {
    const fileName = filepath.split("/").slice(-1)[0];

    const newFile = new ITRetailOutboundFile();

    newFile.processID = randomUUID();
    newFile.filePath = filepath;
    newFile.fileName = fileName;
    newFile.extension = this.getExtension(filepath);

    const nameparts = fileName.split("_");
    const timestamp = nameparts[nameparts.length - 1];
    const date = moment.utc(timestamp, "YYMMDDHHmm");

    newFile.fileTime = date.toISOString();
    newFile.collectionName = nameparts[2];

    return newFile;
  }
}

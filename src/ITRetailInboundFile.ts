import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("it_retail_outbound_files")
export class ITRetailInboundFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @Column()
  fileName: string;

  @Column()
  fileTime: string;

  @Column()
  extension: string;

  @Column()
  status: string;
}

import { DataSource } from "typeorm";
import { ITRetailInboundFile } from "../ITRetailInboundFile";
import { ITRetailOutboundFile } from "../ITRetailOutboundFile";

export const datasource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  entities: [ITRetailOutboundFile, ITRetailInboundFile],
  synchronize: true,
});

beforeAll(async () => {
  await datasource.initialize();
});

const BASE_PATH = "/some/path/to/file/";

const data = [
  {
    path: `${BASE_PATH}ITR_305_TransRegster_2206071305.ITRXML`,
    name: `ITR_305_TransRegster_2206071305.ITRXML`,
    date: `2022-06-07T13:05:00.000Z`,
  },
  {
    path: `${BASE_PATH}ITR_305_UpdatedProducts_1_2205081830.ITRXML`,
    name: `ITR_305_UpdatedProducts_1_2205081830.ITRXML`,
    date: `2022-05-08T18:30:00.000Z`,
  },
  {
    path: `${BASE_PATH}ITR_305_SignatureRegster_2206061650.ITRXML`,
    name: `ITR_305_SignatureRegster_2206061650.ITRXML`,
    date: `2022-06-06T16:50:00.000Z`,
  },
];

test("Accurately parses out file extension", async () => {
  for (const importFile of data) {
    const file = ITRetailOutboundFile.create(importFile.path);

    const savedFile = await datasource
      .getRepository(ITRetailOutboundFile)
      .save(file);

    expect(savedFile.extension).toEqual(".ITRXML");
    expect(savedFile.filePath).toEqual(importFile.path);
    expect(savedFile.fileName).toEqual(importFile.name);
    expect(savedFile.fileTime).toEqual(importFile.date);
  }
});

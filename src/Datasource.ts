import { DataSource } from "typeorm";
import { ITRetailInboundFile } from "./ITRetailInboundFile";
import { ITRetailOutboundFile } from "./ITRetailOutboundFile";

export const datasource = new DataSource({
  type: "better-sqlite3",
  database: "./itr_sql/itretail.sqlite",
  entities: [ITRetailOutboundFile, ITRetailInboundFile],
  synchronize: true,
});

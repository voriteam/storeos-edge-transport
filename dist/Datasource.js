"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasource = void 0;
const typeorm_1 = require("typeorm");
const ITRetailInboundFile_1 = require("./ITRetailInboundFile");
const ITRetailOutboundFile_1 = require("./ITRetailOutboundFile");
exports.datasource = new typeorm_1.DataSource({
    type: "better-sqlite3",
    database: "./itr_sql/itretail.sqlite",
    entities: [ITRetailOutboundFile_1.ITRetailOutboundFile, ITRetailInboundFile_1.ITRetailInboundFile],
    synchronize: true,
});
//# sourceMappingURL=Datasource.js.map
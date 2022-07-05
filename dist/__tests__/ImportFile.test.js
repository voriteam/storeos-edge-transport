"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImportFile_1 = require("../ImportFile");
const BASE_PATH = "/some/path/to/file/";
const data = [
    {
        path: `${BASE_PATH}ITR_305_TransRegster_2206071305.ITRXML`,
        tableName: "TransRegster",
    },
    {
        path: `${BASE_PATH}ITR_305_UpdatedProducts_1_2205081830.ITRXML`,
        tableName: "UpdatedProducts",
    },
    {
        path: `${BASE_PATH}ITR_305_SignatureRegster_2206061650.ITRXML`,
        tableName: "SignatureRegster",
    },
    {
        path: `${BASE_PATH}ITR_302_IHeader_2206031530.ITRXML`,
        tableName: "IHeader",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesTaxes_2206062040.ITRXML`,
        tableName: "SalesTaxes",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesStore_2206051050.ITRXML`,
        tableName: "SalesStore",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesSection_2206021710.ITRXML`,
        tableName: "SalesSection",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesPM_1_2206032010.ITRXML`,
        tableName: "SalesPM",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesLaneTotal_2206062220.ITRXML`,
        tableName: "SalesLaneTotal",
    },
    {
        path: `${BASE_PATH}ITR_305_SalesLaneDtl_2205312310.ITRXML`,
        tableName: "SalesLaneDtl",
    },
];
test("Accurately parses out file extension", () => {
    for (const importFile of data) {
        const file = new ImportFile_1.ImportFile(importFile.path);
        expect(file.getFileExtension()).toEqual(".ITRXML");
    }
});
//# sourceMappingURL=ImportFile.test.js.map
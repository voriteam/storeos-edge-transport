"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSftp = void 0;
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const sftp = new ssh2_sftp_client_1.default();
const SFTPCredentials = {
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
};
const credentials = {
    host: "data.sftp.us.stedi.com",
    port: "22",
    username: SFTPCredentials.username,
    password: SFTPCredentials.password,
};
async function uploadSftp(filepath) {
    const client = await sftp.connect(credentials);
    try {
        const d = await client.cwd();
        console.log(`remote dir is ${d}`);
        await sftp.fastGet(`${d}/foo.txt`, "bat.txt");
        await client.end();
    }
    catch (e) {
        console.error(e.message);
    }
    finally {
        await client.end();
    }
}
exports.uploadSftp = uploadSftp;
//# sourceMappingURL=SFTPClient.js.map
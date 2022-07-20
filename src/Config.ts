export interface AppConfig {
  sftp: {
    host: string;
    sftpUser: string;
    sftpPassword: string;
  };
  itrOutboundPath: string;
  itrInboundPath: string;
  hostImportPath: string;
}

export function getConfig(): AppConfig {
  const sftp = {
    host: "data.sftp.us.stedi.com",
    sftpUser: process.env.SFTP_USERNAME ?? "",
    sftpPassword: process.env.SFTP_PASSWORD ?? "",
  };

  return {
    sftp: sftp,
    itrOutboundPath: process.env.VORI_ITR_OUTBOUND_PATH ?? "",
    itrInboundPath: process.env.VORI_ITR_INBOUND_PATH ?? "",
    hostImportPath: process.env.VORI_ITR_HOST_IMPORT_PATH ?? "",
  };
}

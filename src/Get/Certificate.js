import { execute } from "../DbConnection";

export const GetCertificate = (callback) => {
  execute("SELECT * FROM TB_BRQ_CERT", (result) => {
    callback(result);
  });
};

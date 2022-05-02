import { execute } from "../DbConnection";

export const GetCertificate = (callback) => {
  execute("SELECT * FROM TB_BRQ_CERT", (result) => {
    const response = result.rows.map((item) => ({
      id: item[0],
      name: item[1],
    }));

    callback(response);
  });
};

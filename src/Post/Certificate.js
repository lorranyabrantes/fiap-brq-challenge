import { execute } from "../DbConnection";

export const PostCertificate = (body, callback) => {
  const certificate = `INSERT INTO TB_BRQ_CERT (nm_certificacao) VALUES ('${body.name}') returning cd_certificacao into :id`;

  const insertCertificate = (resultCertificate) => {
    callback({ id: resultCertificate.outBinds.id[0] });
  };

  execute(certificate, insertCertificate, true);
};

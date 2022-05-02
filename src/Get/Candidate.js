import { execute } from "../DbConnection";

export const GetCandidate = (params, callback) => {
  let select = "SELECT * FROM TB_BRQ_CANDIDATO WHERE";

  if (params.id) {
    select = `${select} cd_candidato=${params.id}`;
  } else if (params.email) {
    select = `${select} ds_email='${params.email}'`;
  } else if (params.cpf) {
    select = `${select} sq_cpf=${params.cpf}`;
  } else {
    callback({});
    return false;
  }

  console.log(select);

  const data = (result) => {
    const {
      rows: [candidate],
    } = result;

    console.log(candidate);

    if (!candidate) {
      callback({});
      return false;
    }

    const selectSkill = `SELECT * FROM TB_BRQ_C_H WHERE cd_candidato=${candidate[0]}`;

    const dataSkill = (resultSkill) => {
      const { rows: skills } = resultSkill;

      const selectCertificate = `SELECT * FROM TB_BRQ_C_C WHERE cd_candidato=${candidate[0]}`;

      const dataCertificate = (resultCertificate) => {
        const { rows: certificates } = resultCertificate;

        callback({
          id: candidate[0],
          name: candidate[1],
          cpf: candidate[2],
          email: candidate[3],
          phone: candidate[4],
          bithdate: candidate[5],
          gender: candidate[6],
          skills: skills.map((item) => item[1]),
          certificates: certificates.map((item) => item[1]),
        });
      };

      execute(selectCertificate, dataCertificate);
    };

    execute(selectSkill, dataSkill);
  };

  execute(select, data);
};

import { execute } from "../DbConnection";

export const GetCandidate = (params, callback) => {
  const select = `SELECT * FROM TB_BRQ_CANDIDATO WHERE cd_candidato=${params.id}`;

  const data = (result) => {
    const {
      rows: [candidate],
    } = result;

    const selectSkill = `SELECT * FROM TB_BRQ_C_H WHERE cd_candidato=${params.id}`;

    const dataSkill = (resultSkill) => {
      const { rows: skills } = resultSkill;

      const selectCertificate = `SELECT * FROM TB_BRQ_C_C WHERE cd_candidato=${params.id}`;

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

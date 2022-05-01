import { execute } from "../DbConnection";

export const GetCandidate = (params, callback) => {
  const select = `SELECT * FROM TB_BRQ_CANDIDATO WHERE cd_candidato=${params.id}`;

  const data = (result) => {
    const {
      rows: [candidate],
    } = result;

    callback({
      id: candidate[0],
      name: candidate[1],
      cpf: candidate[2],
      email: candidate[3],
      phone: candidate[4],
      bithdate: candidate[5],
      gender: candidate[6],
    });
  };

  execute(select, data);
};

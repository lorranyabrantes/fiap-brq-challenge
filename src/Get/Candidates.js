import { execute } from "../DbConnection";

export const GetCandidates = (params, callback) => {
  let select = `SELECT TB_BRQ_CANDIDATO.CD_CANDIDATO CD_CANDIDATO,
  TB_BRQ_CANDIDATO.NM_CANDIDATO NM_CANDIDATO,
  TB_BRQ_CANDIDATO.SQ_CPF SQ_CPF,
  TB_BRQ_CANDIDATO.DS_EMAIL DS_EMAIL,
  TB_BRQ_CANDIDATO.VL_TELEFONE VL_TELEFONE,
  TB_BRQ_CANDIDATO.DT_NASCIMENTO DT_NASCIMENTO,
  TB_BRQ_CANDIDATO.DS_GENERO DS_GENERO,
  TB_BRQ_C_H.CD_HABILIDADE CD_HABILIDADE,
  TB_BRQ_C_C.CD_CERTIFICACAO CD_CERTIFICACAO FROM TB_BRQ_CANDIDATO 
  INNER JOIN TB_BRQ_C_H ON TB_BRQ_C_H.cd_candidato = TB_BRQ_CANDIDATO.cd_candidato 
  INNER JOIN TB_BRQ_C_C ON TB_BRQ_C_C.cd_candidato = TB_BRQ_CANDIDATO.cd_candidato`;

  if (params.name) {
    select = `${select} WHERE nm_candidato LIKE '%${params.name}%'`;
  } else if (params.skill) {
    select = `${select} WHERE TB_BRQ_C_H.CD_HABILIDADE=${params.skill}`;
  } else if (params.certificate) {
    select = `${select} WHERE TB_BRQ_C_C.CD_CERTIFICACAO=${params.certificate}`;
  } else {
    callback({});
    return false;
  }

  const data = (result) => {
    const { rows: candidate } = result;

    if (!candidate) {
      callback({});
      return false;
    }

    const reduced = candidate.reduce((acc, actual, index) => {
      if (actual[0] in acc) {
        acc[actual[0]] = [...acc[actual[0]], actual];
      } else {
        acc[actual[0]] = [actual];
      }
      return acc;
    }, {});

    const values = Object.values(reduced);

    const response = values.map((item) => ({
      id: item[0][0],
      name: item[0][1],
      cpf: item[0][2],
      email: item[0][3],
      phone: item[0][4],
      bithdate: item[0][5],
      gender: item[0][6],
      skills: [...new Set(item.map((item) => item[7]))],
      certificates: [...new Set(item.map((item) => item[8]))],
    }));

    callback(response);
  };

  execute(select, data);
};

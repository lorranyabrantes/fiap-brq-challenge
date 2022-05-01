import { execute } from "../DbConnection";

export const PostCandidate = (body, callback) => {
  console;
  const candidate = `INSERT INTO TB_BRQ_CANDIDATO
    (
        nm_candidato,
        sq_cpf,
        ds_email,
        vl_telefone,
        dt_nascimento,
        ds_genero
        )
        VALUES
        (
            '${body.name}',
            '${body.cpf}',
            '${body.email}',
            ${body.phone},
            '${body.bithdate}',
            '${body.gender}'
            )
              returning cd_candidato into :id`;

  const insertCandidate = (resultCandidate) => {
    callback({ id: resultCandidate.outBinds.id[0] });
  };

  execute(candidate, insertCandidate, true);
};

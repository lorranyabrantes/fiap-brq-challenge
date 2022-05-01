import { execute } from "../DbConnection";

export const PostCandidate = (body, callback) => {
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
    const idCandidato = resultCandidate.outBinds.id[0];

    body.skills.map((item) => {
      const skill = `INSERT INTO TB_BRQ_C_H (cd_candidato, cd_habilidade) VALUES (${idCandidato}, ${item})`;

      execute(skill, () => {});
    });

    body.certificates.map((item) => {
      const certificate = `INSERT INTO TB_BRQ_C_C (cd_candidato, cd_certificacao) VALUES (${idCandidato}, ${item})`;

      execute(certificate, () => {});
    });

    callback({ id: idCandidato });
  };

  execute(candidate, insertCandidate, true);
};

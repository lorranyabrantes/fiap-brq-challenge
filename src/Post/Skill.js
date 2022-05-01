import { execute } from "../DbConnection";

export const PostSkill = (body, callback) => {
  const skill = `INSERT INTO TB_BRQ_HAB (nm_habilidade) VALUES ('${body.name}') returning cd_habilidade into :id`;

  const insertSkill = (resultSkill) => {
    callback({ id: resultSkill.outBinds.id[0] });
  };

  execute(skill, insertSkill, true);
};

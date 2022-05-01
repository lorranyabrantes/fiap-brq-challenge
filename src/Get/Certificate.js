import { execute } from "../DbConnection";

export const GetSkill = (callback) => {
  execute("SELECT * FROM TB_BRQ_CERT", (result) => {
    callback(result);
  });
};

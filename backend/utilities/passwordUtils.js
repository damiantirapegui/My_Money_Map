const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds); // Hasha lösenordet
  return hashPassword;
};

module.exports = { hashPassword };

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const data = { user: { id: user.id } };
  return jwt.sign(data, "secret_ecom");
};

module.exports = { generateToken };

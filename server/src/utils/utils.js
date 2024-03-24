const ERRORS = require("../helpers/errors.js");

const findError = (code) => {
  return ERRORS.find((err) => err.code == code);
}

module.exports = { findError };

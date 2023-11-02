function parseValidateError(error) {
  let errors = {};

  Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
  });

  return errors;
}

module.exports = {
  parseValidateError,

}
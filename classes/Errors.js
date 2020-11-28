class AuthenticationError extends (
  Error
) {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
};
class InputError extends (
  Error
) {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, InputError.prototype)
  }
};
class NotFoundError extends (
  Error
) {
  constructor(message) {
      super(message);
      Object.setPrototypeOf(this, NotFoundError.prototype)
  }
};

module.exports = {AuthenticationError, InputError, NotFoundError}
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

class InputError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, InputError.prototype);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class NoContentError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NoContentError.prototype);
  }
}

class EntryExistsError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, EntryExistsError.prototype);
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

class QueryError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, QueryError.prototype);
  }
}

module.exports = {
  AuthenticationError,
  InputError,
  NotFoundError,
  NoContentError,
  EntryExistsError,
  ConflictError,
  QueryError,
};

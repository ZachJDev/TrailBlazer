class CustomSenderError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomSenderError.prototype);
    }
    sendRes(resObj){
        return (status, errorMessage) => {
            return resObj.status(status).json({success: false, errors: [errorMessage]});
        }
    }
    test() {
        console.log('asdf')
    }
}

class AuthenticationError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
    sendRes(resObj){
        return () => {
            return resObj.status(401).json({success: false, errors: ['User is Not Authenticated']});
        }
    }
}

class InputError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, InputError.prototype);
  }
}

class NotFoundError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
    sendRes(resObj){
        return (entity = 'entity') => {
            return resObj.status(404).json({success: false, errors: [`Could not find specified ${entity}`]});
        }
    }
}

class NoContentError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NoContentError.prototype);
  }

}

class EntryExistsError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, EntryExistsError.prototype);
  }
}

class ConflictError extends CustomSenderError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
    sendRes(resObj){
        return (entity = 'submission') => {
            return resObj.status(409).json({success: false, errors: [`Provided ${entity} is not acceptable`]});
        }
    }
}

class QueryError extends CustomSenderError {
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

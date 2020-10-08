export default class ApiError extends Error {
  constructor(readonly message: string, readonly source?: Error) {
    super();
  }
}

export class DocumentNotFoundError extends ApiError {
  constructor(readonly message: string = "Document not found", source?: Error) {
    super(message, source);
    Object.setPrototypeOf(this, DocumentNotFoundError.prototype);
  }
}

export class DatabaseError extends ApiError {
  constructor(readonly message: string = "Database Error", source?: Error) {
    super(message, source);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class NotAllowedError extends ApiError {
  constructor(
    readonly message: string = "You cannot access this route at this time.",
    source?: Error
  ) {
    super(message, source);
    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }
}

export class InvalidInputError extends ApiError {
  constructor(
    readonly message: string = "One or more Inputs were invalid.",
    source?: Error
  ) {
    super(message, source);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(
    readonly message: string = "This Resource is already in use..",
    source?: Error
  ) {
    super(message, source);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    readonly message: string = "You are not authorized to perform this action",
    source?: Error
  ) {
    super(message, source);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

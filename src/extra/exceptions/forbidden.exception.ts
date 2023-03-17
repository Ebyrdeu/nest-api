import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      'please stop trying to find a new way to kill this app. Choose another account that does not match with' +
        ' targeted' +
        ' email',
      HttpStatus.FORBIDDEN,
    );
  }
}

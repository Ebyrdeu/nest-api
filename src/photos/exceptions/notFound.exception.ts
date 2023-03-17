import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundPhotoException extends HttpException {
  constructor(private photoId: string) {
    super(
      `You do have any photo with id ${photoId}, make sure to that you chose photo that you actually have on your account `,
      HttpStatus.NOT_FOUND,
    );
  }
}

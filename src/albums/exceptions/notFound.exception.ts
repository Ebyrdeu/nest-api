import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundAlbumException extends HttpException {
  constructor(private albumId: string) {
    super(
      `You do not posses any album with id ${albumId}, make sure to that you chose photo that you actually have on your account `,
      HttpStatus.NOT_FOUND,
    );
  }
}

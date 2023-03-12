import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthDto } from '@auth/dto';
import { Tokens } from '@auth/types';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RtGuard } from '@auth/common/guards';
import { GetCurrentUserId, Public } from '@auth/common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    schema: {
      example: {
        access_token: 'access token',
        refresh_token: 'refresh token',
      },
    },
  })
  signUp(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      example: {
        access_token: 'access token',
        refresh_token: 'refresh token',
      },
    },
  })
  signIn(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('jwt-access')
  @ApiResponse({
    description: 'If count shows 0 its means you already logout',
    schema: {
      example: {
        count: 1,
      },
    },
  })
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('jwt-refresh')
  @ApiResponse({
    schema: {
      example: {
        access_token: 'access token',
        refresh_token: 'refresh token',
      },
    },
  })
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(user['sub'], user['refreshToken']);
  }
}

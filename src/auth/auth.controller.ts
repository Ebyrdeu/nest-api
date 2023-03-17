import { AuthService } from '@auth/auth.service';
import { GetCurrentUser, Public } from '@auth/common/decorators';
import { RtGuard } from '@auth/common/guards';
import { AuthDto } from '@auth/dto';
import { type Tokens } from '@auth/types';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { type Request } from 'express';

@ApiTags('User Authentication')
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
  @ApiOperation({ summary: 'Create New User' })
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
  @ApiOperation({ summary: 'Login as existing user' })
  signIn(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('jwt-access')
  @ApiResponse({
    schema: {
      example: {
        status: 'success',
        message: 'You have been logged out',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      'If you see error 401 it means either i have already logged out or you have not be logged',
    schema: {
      example: {
        statusCode: 'error',
        message: 'Unauthorized',
      },
    },
  })
  @ApiOperation({ summary: 'Logout current logged user' })
  logout(@GetCurrentUser('id') userId: string) {
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
  @ApiOperation({ summary: 'RT current logged user' })
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(user['id'], user['refreshToken']);
  }
}

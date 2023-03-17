import { AuthDto } from '@auth/dto';
import { type Tokens } from '@auth/types';
import { DbService } from '@db/db.service';
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private db: DbService,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, password }: AuthDto): Promise<Tokens> {
    const hashedPassword = await this.hashPassword(password);

    const user = await this.db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return this.returnTokens(user);
  }

  async signIn({ email, password }: AuthDto): Promise<Tokens> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('access denied');

    // Compare the password that user give  with the user's password
    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) throw new ForbiddenException('access denied');
    return this.returnTokens(user);
  }

  async logout(userId: string) {
    const user = await this.db.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });

    if (user.count === 0) throw new ForbiddenException('access denied');

    return {
      status: HttpStatus.OK,
      message: 'You have been logged out',
    };
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await compare(rt, user.refreshToken);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    return this.returnTokens(user);
  }

  private hashPassword(unHashedPassword: string): Promise<string> {
    return hash(unHashedPassword, 10);
  }

  private async returnTokens(user: User) {
    // Generate an access token and refresh token for the user
    const tokens = await this.getTokens(user.id, user.email);

    // Update the user's refresh token in the database
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  private async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.config.get('AT_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.config.get('RT_SECRET'),

          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRefreshToken(userId: string, rt: string) {
    const hash = await this.hashPassword(rt);
    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }
}

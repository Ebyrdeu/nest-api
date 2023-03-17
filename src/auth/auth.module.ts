import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { AtStrategy, RtStrategy } from '@auth/strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

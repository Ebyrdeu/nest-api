import { Module } from '@nestjs/common';
import { ExtraController } from './extra.controller';
import { ExtraService } from './extra.service';

@Module({
  controllers: [ExtraController],
  providers: [ExtraService],
})
export class ExtraModule {}

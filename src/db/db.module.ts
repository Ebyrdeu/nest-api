import { DbService } from '@db/db.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}

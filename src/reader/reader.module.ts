import { Module } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';

@Module({
  providers: [ReaderService],
  controllers: [ReaderController]
})
export class ReaderModule {}

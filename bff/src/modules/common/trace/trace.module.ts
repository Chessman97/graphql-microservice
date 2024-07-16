import { Module } from '@nestjs/common';
import { TraceService } from './trace.service';

@Module({
  imports: [],
  providers: [TraceService],
  exports: [TraceService],
})
export class TraceModule {}

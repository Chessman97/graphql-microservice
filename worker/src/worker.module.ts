import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WorkerController],
  providers: [WorkerService, Logger],
})
export class WorkerModule {}

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TraceMiddleware } from './modules/common/trace/middlewares';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WorkerController],
  providers: [WorkerService, Logger],
})
export class WorkerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TraceMiddleware).forRoutes(WorkerController);
  }
}

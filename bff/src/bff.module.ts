import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BffController } from './bff.controller';
import { BffService } from './bff.service';
import { TraceMiddleware } from './modules/common/trace/middlewares';
import { TraceModule } from './modules/common/trace/trace.module';

@Module({
  imports: [ConfigModule.forRoot(), TraceModule],
  controllers: [BffController],
  providers: [BffService, Logger],
})
export class BffModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TraceMiddleware).forRoutes(BffController);
  }
}

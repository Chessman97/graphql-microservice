import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { BffController } from './bff.controller';
import { BffResolver } from './bff.resolver';
import { BffService } from './bff.service';
import { TraceMiddleware } from './modules/common/trace/middlewares';
import { TraceModule } from './modules/common/trace/trace.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TraceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [BffController],
  providers: [BffService, Logger, BffResolver],
})
export class BffModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TraceMiddleware).forRoutes(BffController);
  }
}

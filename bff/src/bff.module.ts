import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BffResolver } from './bff.resolver';
import { BffService } from './bff.service';
import { WORKER_SERVICE_NAME } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      {
        name: WORKER_SERVICE_NAME,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3000 },
      },
    ]),
  ],
  providers: [BffService, Logger, BffResolver],
})
export class BffModule {}

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BffModule } from './bff.module';

async function bootstrap() {
  const config = new ConfigService();

  const app = await NestFactory.create(BffModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get('MICROSERVICE_HOST'),
      port: Number(config.get('MICROSERVICE_PORT')),
    },
  });

  await app.startAllMicroservices();
  await app.listen(Number(config.get('APPLICATION_PORT')));
}
bootstrap();

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { BffService } from './bff.service';
import { WORKER_SERVICE_NAME } from './constants';
import { Response } from './decorators';
import { BffTypes } from './enums';
import { Bff, BffInput, BffResponse } from './models/bff.model';

@Resolver(of => Bff)
export class BffResolver {
  constructor(
    private readonly bffService: BffService,
    private readonly logger: Logger,
    @Inject(WORKER_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  // Валидация объекта
  @UsePipes(new ValidationPipe({ transform: true }))
  // pipe response
  @Response()
  @Query(returns => [BffResponse])
  async doJob(@Args('data') input: BffInput) {
    const methodName = this.doJob.name;
    this.logger.log(input);
    this.logger.log(`${methodName} | Type: ${input.type} | Start`);
    switch (input.type) {
      case BffTypes.HEAVY: {
        const data = { count: input.count };
        this.logger.log(`${methodName} | Data: ${input.count} | Sending heavy-job...`);
        return this.client.send<number>('heavy-job', data);
      }
      case BffTypes.LIGHT: {
        const data = { data: input.data };
        this.logger.log(`${methodName} | Data: ${input.data} | Sending light-job...`);
        return this.client.send<number>('light-job', data);
      }
      default: {
        break;
      }
    }
  }
}

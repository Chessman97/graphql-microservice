/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BffService } from './bff.service';
import { Bff, BffInput } from './models/bff.model';

@Resolver(of => Bff)
export class BffResolver {
  constructor(
    private readonly bffService: BffService,
    private readonly logger: Logger,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Query(returns => Bff)
  async doJob(@Args('data') input: BffInput) {
    return input;
  }
}

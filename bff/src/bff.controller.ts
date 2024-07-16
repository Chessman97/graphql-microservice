import { Controller, Get, Logger, Param } from '@nestjs/common';
import { BffService } from './bff.service';

@Controller()
export class BffController {
  constructor(
    private readonly WorkerService: BffService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    return this.WorkerService.getHello();
  }

  @Get('do-job')
  async getUserById(@Param('id') id: number) {
    console.log('BBBBBBBBBB');
    return id;
  }
}

import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IHeavyJob, ILightJob } from './interfaces';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(
    private readonly WorkerService: WorkerService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('heavy-job')
  doHeavyJob(data: IHeavyJob): number {
    this.logger.log(data);
    return;
  }

  @MessagePattern('light-job')
  doLightJob(data: ILightJob): Observable<number> {
    const methodName = this.doLightJob.name;
    this.logger.log(data);
    this.logger.log(`${methodName} | Data: ${data} | Start`);
    const num: number = data.data;
    const numPow: number = Math.pow(num, num);
    this.logger.log(`${methodName} | Number squared: ${numPow} | End`);
    return from([numPow]);
  }

  @Get()
  getHello(): string {
    return this.WorkerService.getHello();
  }
}

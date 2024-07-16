import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { HeavyJobDtoRequest, LightJobDtoRequest } from './dto';
import { IMessageDto } from './interfaces';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(
    private readonly workerService: WorkerService,
    private readonly logger: Logger,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @MessagePattern('heavy-job')
  doHeavyJob(data: HeavyJobDtoRequest): any {
    const methodName = this.doHeavyJob.name;
    this.logger.log(`${methodName} | Data: ${data.count} | Start`);
    const messages: IMessageDto[] = this.workerService.generateHeavyMessages(data.count);
    this.logger.log(`${methodName} | Messages generated | End`);
    return of(messages);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @MessagePattern('light-job')
  doLightJob(data: LightJobDtoRequest): Observable<IMessageDto[]> {
    const methodName = this.doLightJob.name;
    const num = data.data;
    this.logger.log(`${methodName} | Data: ${num} | Start`);
    const messages = this.workerService.generateLightMessages(num);
    this.logger.log(`${methodName} |  Messages generated | End`);
    return of(messages);
  }
}

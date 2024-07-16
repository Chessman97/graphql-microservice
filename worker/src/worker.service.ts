import { Injectable } from '@nestjs/common';
import { IMessageDto } from './interfaces';

@Injectable()
export class WorkerService {
  generateHeavyMessages(count: number): IMessageDto[] {
    const messages: IMessageDto[] = [];
    for (let i = 0; i < count; i++) {
      messages.push({ message: Math.floor(Math.random()) });
    }
    return messages;
  }

  generateLightMessages(data: number): IMessageDto[] {
    const numPow: number = Math.pow(data, data);
    return [{ message: numPow }];
  }
}

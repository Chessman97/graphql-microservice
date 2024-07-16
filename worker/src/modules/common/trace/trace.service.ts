import { Injectable } from '@nestjs/common';
import { createNamespace, Namespace } from 'cls-hooked';
import { randomUUID } from 'crypto';
import EventEmitter from 'events';
import { TraceEnum } from './enums';
import { ITraceService } from './interfaces';

@Injectable()
export class TraceService implements ITraceService {
  private clsNamespace: Namespace;

  constructor() {
    this.clsNamespace = createNamespace(TraceEnum.APP);
  }

  getTraceId(): string {
    return this.clsNamespace.get(TraceEnum.TRACE_ID);
  }

  bindEmitter(obj: EventEmitter): void {
    this.clsNamespace.bindEmitter(obj);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bind(callback: Function, context: any): void {
    this.clsNamespace.bind(callback, context);
  }

  setTraceId(): void {
    const traceID = randomUUID();
    this.clsNamespace.set(TraceEnum.TRACE_ID, traceID);
  }

  run(func): void {
    this.clsNamespace.run(func);
  }
}

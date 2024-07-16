import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ITraceService } from '../interfaces';
import { TraceService } from '../trace.service';
// Middleware может не работать, если версии fastify и dependencies.fastify из @nestjs/platform-fastify будут отличаться
// https://stackoverflow.com/questions/63978181/nestjs-middleware-not-executed#comment117831786_63984129

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  constructor(@Inject(TraceService) private readonly traceService: ITraceService) {}

  use(req: any, res: any, next) {
    this.traceService.bindEmitter(req);
    this.traceService.bindEmitter(res);

    this.traceService.run(() => {
      this.traceService.setTraceId();
      next();
    });
  }
}

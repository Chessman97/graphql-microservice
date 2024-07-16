import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      mergeMap(async (data: any) => {
        return data;
      }),
    );
  }
}

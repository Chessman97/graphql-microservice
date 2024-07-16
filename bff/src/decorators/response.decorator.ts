import { UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors';

export function Response() {
  return UseInterceptors(ResponseInterceptor);
}

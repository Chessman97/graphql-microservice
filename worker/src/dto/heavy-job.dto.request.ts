import { IsNumber } from 'class-validator';
import { IHeavyJob } from '../interfaces';

export class HeavyJobDtoRequest implements IHeavyJob {
  @IsNumber()
  count: number;
}

import { IsNumber } from 'class-validator';
import { ILightJob } from '../interfaces';

export class LightJobDtoRequest implements ILightJob {
  @IsNumber()
  data: number;
}

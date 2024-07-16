/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { BffTypes } from '../enums';
import { AtLeastOneNotEmpty } from '../validators';

@ObjectType({ description: 'Bff' })
export class Bff {
  @Field(type => Int, { nullable: true })
  count?: number;

  @Field(type => Int, { nullable: true })
  data?: number;

  @Field({ nullable: false })
  type: BffTypes;
}

@InputType()
export class BffInput {
  @Field({ nullable: false })
  @IsEnum(BffTypes)
  type: BffTypes;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @AtLeastOneNotEmpty(['count', 'data'], {
    message: `'One the optional 'count' or 'data' fields must be assigned`,
  })
  count?: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @AtLeastOneNotEmpty(['count', 'data'], {
    message: `'One the optional 'count' or 'data' fields must be assigned`,
  })
  data?: number;
}

import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ProgressRequestDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  readonly progress: number;
}

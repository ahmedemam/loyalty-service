import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateOrUpdateTransactionDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  confirmed: boolean;

  @IsString()
  @IsEmail()
  @ApiProperty()
  reviverEmail?: string;

  @IsInt()
  @ApiProperty()
  point?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { TransactionDto } from 'src/modules/transactions/dto/transaction.dto';

export class UserDto {
  @IsInt()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name?: string;

  @IsInt()
  @ApiProperty()
  point?: number;

  @IsOptional()
  @ApiProperty({ type: () => TransactionDto, isArray: true })
  transactions?: TransactionDto[];
}

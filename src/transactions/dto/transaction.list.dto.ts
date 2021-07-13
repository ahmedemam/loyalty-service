import { ApiProperty } from '@nestjs/swagger';
import { TransactionDto } from './transaction.dto';
import { IsInt } from 'class-validator';

export class ListTransactionsDto {
  @IsInt()
  @ApiProperty()
  count: number;

  @ApiProperty({ type: TransactionDto })
  transactions: TransactionDto[];
}

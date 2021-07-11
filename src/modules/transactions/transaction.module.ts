import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [],
  exports: [],
  controllers: [TransactionController],
  providers: [PrismaService, TransactionService],
})
export class TransactionModule {}

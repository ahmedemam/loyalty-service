import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionEventListner {
  @OnEvent('transaction.created')
  handleTransactionCreatedEvent(event: TransactionDto) {
    console.log(event);
  }

  @OnEvent('transaction.updated')
  handleTransactionUpdatedEvent(event: TransactionDto) {
    console.log(event);
  }
}

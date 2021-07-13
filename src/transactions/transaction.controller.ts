import { Body, Param, Post, Put, Req } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { Request } from 'express';
import { OAuthUserDto } from '../authentication/dto/oauth.user.dto';
import { CreateOrUpdateTransactionDto } from './dto/create-update-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Transactions APIs')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, private eventEmitter: EventEmitter2) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOrUpdateTransactionDto })
  @Post('')
  @ApiCreatedResponse({ type: TransactionDto })
  public async createTransaction(@Req() request: Request, @Body() createdTransactionPayload: CreateOrUpdateTransactionDto): Promise<TransactionDto | Transaction> {
    const oauthUser = request.user as OAuthUserDto;
    const createTransaction = this.transactionService.createNewTransaction(createdTransactionPayload, oauthUser);
    this.eventEmitter.emit('transaction.created', createTransaction);
    return createTransaction;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOrUpdateTransactionDto })
  @Put(':id')
  @ApiCreatedResponse({ type: TransactionDto })
  public async confirmTransaction(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    updatedTransactionId: number,
    @Req() request: Request,
    @Body() updatedTransactionPayload: CreateOrUpdateTransactionDto,
  ): Promise<TransactionDto> {
    const oauthUser = request.user as OAuthUserDto;
    const updatedTransaction = this.transactionService.updatedTransaction(updatedTransactionId, updatedTransactionPayload, oauthUser);
    this.eventEmitter.emit('transaction.updated', updatedTransaction);
    return updatedTransaction;
  }
}

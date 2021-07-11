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

@ApiTags('Transactions APIs')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOrUpdateTransactionDto })
  @Post('')
  @ApiCreatedResponse({ type: TransactionDto })
  public async createTransaction(@Req() request: Request, @Body() createdTransaction: CreateOrUpdateTransactionDto): Promise<TransactionDto | Transaction> {
    const oauthUser = request.user as OAuthUserDto;
    return await this.transactionService.createNewTransaction(createdTransaction, oauthUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOrUpdateTransactionDto })
  @Put(':id')
  @ApiCreatedResponse({ type: TransactionDto })
  public async confirmTransaction(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    updatedTransactionId: number,
    @Req() request: Request,
    @Body() updatedTransaction: CreateOrUpdateTransactionDto,
  ): Promise<TransactionDto> {
    const oauthUser = request.user as OAuthUserDto;
    return await this.transactionService.updatedTransaction(updatedTransactionId, updatedTransaction, oauthUser);
  }
}

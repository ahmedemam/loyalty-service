import { Transaction } from '.prisma/client';
import { BadRequestException } from '@nestjs/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import moment from 'moment';
import { PrismaService } from 'src/prisma.service';
import { OAuthUserDto } from '../authentication/dto/oauth.user.dto';
import { UserDto } from '../users/dto/user.dto';
import { CreateOrUpdateTransactionDto } from './dto/create-update-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  public async createNewTransaction(createTransaction: CreateOrUpdateTransactionDto, oauthUser: OAuthUserDto): Promise<Transaction | TransactionDto> {
    try {
      const isUserExists = await this.prismaService.user.findUnique({
        where: { email: createTransaction.reviverEmail },
      });
      if (!isUserExists) {
        throw new BadRequestException('User is not exists, Email is not valid');
      }

      return await this.prismaService.transaction.create({
        data: {
          point: createTransaction.point,
          title: `user: ${createTransaction.reviverEmail} will received ${createTransaction.point}`,
          createdAt: new Date(),
          reviverEmail: createTransaction.reviverEmail,
          senderId: oauthUser.user.id,
        },
      });
    } catch (exception) {
      throw new InternalServerErrorException('something went wrong');
    }
  }

  public async updatedTransaction(transactionId: number, updatedTransaction: CreateOrUpdateTransactionDto, oauthUser: OAuthUserDto): Promise<Transaction | TransactionDto> {
    try {
      const isUserExists = await this.prismaService.user.findUnique({
        where: { email: updatedTransaction.reviverEmail },
      });
      if (!isUserExists) {
        throw new BadRequestException('User is not exists, Email is not valid');
      }

      const currentTransaction = await await this.prismaService.transaction.findUnique({
        where: { id: transactionId },
        include: { sender: true },
      });

      const createdDate = moment(currentTransaction.createdAt);
      const confirmationDate = moment();
      const isValidConfirmation = confirmationDate.diff(createdDate, 'minutes') <= 10 ? true : false;

      if (!isValidConfirmation || currentTransaction.expired) {
        await this.prismaService.transaction.update({
          where: { id: transactionId },
          data: {
            confirmed: false,
            expired: true,
          },
        });
        throw new BadRequestException('Transaction expired');
      }

      const receiverUser = await this.updateReceievrPoints(currentTransaction.reviverEmail, currentTransaction.point);

      return await this.prismaService.transaction.update({
        where: { id: transactionId },
        data: {
          point: currentTransaction.point,
          title: `user: ${currentTransaction.reviverEmail} will received ${currentTransaction.point}`,
          createdAt: new Date(),
          expired: true,
          confirmed: true,
          reviverEmail: currentTransaction.reviverEmail,
          senderId: oauthUser.user.id,
        },
      });
    } catch (exception) {
      throw new InternalServerErrorException('something went wrong');
    }
  }

  public async updateReceievrPoints(receiverEmail: string, points: number): Promise<UserDto | User> {
    const receiverUser = await this.prismaService.user.findUnique({
      where: { email: receiverEmail },
    });
    return await this.prismaService.user.update({
      where: { email: receiverEmail },
      data: {
        points: receiverUser.points + points,
      },
    });
  }
}

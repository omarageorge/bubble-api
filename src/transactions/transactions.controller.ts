import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountService: AccountService,
  ) {}

  @Get(':id')
  async findAll(@Param('id') user_id: string) {
    return this.transactionsService.find(user_id);
  }

  @Post()
  async createOne(@Body() transaction: NewTransactionDto) {
    const validTransaction = await this.accountService.validTransaction(
      transaction.sender,
      transaction.amount,
    );

    if (validTransaction) {
      /* Handle valid transaction */
      const newValidTransaction: CreateTransactionDto = {
        ...transaction,
        success: true,
      };

      // Deduct money from source
      this.accountService.deduct(transaction.sender, transaction.amount);

      // Deposit money to receiver
      this.accountService.deposit(transaction.receiver, transaction.amount);

      // Record transaction
      return this.transactionsService.create(newValidTransaction);
    } else {
      /* Handles invalid transaction */
      const newInvalidTransaction: CreateTransactionDto = {
        ...transaction,
        success: false,
      };

      // Record failed transaction
      return this.transactionsService.create(newInvalidTransaction);
    }
  }
}

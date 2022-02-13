import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  async findAll(@Param('id') user_id: string) {
    return this.transactionsService.find(user_id);
  }

  @Post()
  async createOne(@Body() transaction: CreateTransactionDto) {
    return this.transactionsService.create(transaction);
  }
}

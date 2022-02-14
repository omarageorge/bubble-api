import { Controller, Body, Param, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DepositDto } from './dto/deposit.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get()
  async findUsers() {
    return this.userService.find();
  }

  @Get(':id')
  async findOneUser(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('deposit')
  async depositMoney(@Body() deposit: DepositDto) {
    const newDepositTransaction: CreateTransactionDto = {
      sender: deposit.user,
      receiver: deposit.user,
      source_currency: 'USD',
      target_currency: 'USD',
      exchange_rate: 1,
      amount: deposit.amount,
      success: true,
    };

    await this.transactionsService.create(newDepositTransaction);
    return this.userService.deposit(deposit);
  }
}

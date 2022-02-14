import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findAll(@Param('id') user_id: string) {
    return this.transactionsService.find(user_id);
  }
}

import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactionSchema } from './schemas/transaction.schema';
import { AccountModule } from 'src/account/account.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: transactionSchema },
    ]),
    AccountModule,
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}

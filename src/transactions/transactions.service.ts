import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async find(id: string): Promise<FindTransactionDto[]> {
    try {
      const transactions = await this.transactionModel
        .find({
          $or: [{ sender: id }, { receiver: id }],
        })
        .exec();

      return transactions.map((transaction) => ({
        id: transaction._id,
        sender: transaction.sender,
        receiver: transaction.receiver,
        source_currency: transaction.source_currency,
        target_currency: transaction.target_currency,
        exchange_rate: transaction.exchange_rate,
        amount: transaction.amount,
      }));
    } catch (err) {
      throw new HttpException(
        'Could not find transactions',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(transaction: CreateTransactionDto): Promise<FindTransactionDto> {
    try {
      const createdTransaction = new this.transactionModel(transaction);
      const result = await createdTransaction.save();

      return {
        id: result._id,
        sender: result.sender,
        receiver: result.receiver,
        source_currency: result.source_currency,
        target_currency: result.target_currency,
        exchange_rate: result.exchange_rate,
        amount: result.amount,
      };
    } catch (err) {
      throw new HttpException(
        'Could not create transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

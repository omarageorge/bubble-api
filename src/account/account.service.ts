import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAccountDto,
  CreateAccountResDto,
} from './dto/create-account.dto';
import { Account, AccountDocument } from './schema/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  /* Creates new accounts to hold money */
  async create(account: CreateAccountDto): Promise<CreateAccountResDto> {
    try {
      const createdAccount = new this.accountModel(account);

      const result = await createdAccount.save();
      return {
        id: result._id,
        type: result.type,
        balance: result.balance,
      };
    } catch (err) {
      throw new HttpException(
        'Could not create account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* Deposits money from accounts when transferred */
  async deposit(accountId: string, amount: number): Promise<void> {
    try {
      const account = await this.accountModel.findById(accountId).exec();

      // Increment account balance
      account.balance += amount;

      await account.save();
    } catch (err) {
      throw new HttpException(
        'Could not deposit money',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* Deducts money from accounts when transferred */
  async deduct(accountId: string, amount: number): Promise<void> {
    try {
      const account = await this.accountModel.findById(accountId).exec();

      // Decrement account balance
      account.balance -= amount;

      await account.save();
    } catch (err) {
      throw new HttpException(
        'Could not deduct money',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validTransaction(sourceId, amount): Promise<boolean> {
    try {
      const account = await this.accountModel.findById(sourceId).exec();

      if (account.balance > amount) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new HttpException(
        'Could not check validity of transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

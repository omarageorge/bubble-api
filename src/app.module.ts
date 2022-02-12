import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bubble'),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

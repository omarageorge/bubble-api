import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { ControllerModule } from './auth/controller/controller.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/bubble'), ControllerModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}

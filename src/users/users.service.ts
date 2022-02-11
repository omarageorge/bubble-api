import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, CreateUserResultDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /* Find users */
  async find(): Promise<FindUserDto[]> {
    try {
      const users = await this.userModel.find().exec();

      return users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }));
    } catch (err) {
      throw new HttpException('Could not find users', HttpStatus.NOT_FOUND);
    }
  }

  /* Find a user by id */
  async findOne(id: string): Promise<FindUserDto> {
    try {
      const user = await this.userModel.findById(id).exec();
      return { id: user._id, name: user.name, email: user.email };
    } catch (err) {
      throw new HttpException('Could not find user', HttpStatus.NOT_FOUND);
    }
  }

  /* Find a user by email address */
  async findByEmail(email: string): Promise<any> {
    try {
      return await this.userModel.findOne({ email: email }).exec();
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  /* Add new user */
  async create(user: CreateUserDto): Promise<CreateUserResultDto> {
    // Generate salt rounds
    const salt = await bcrypt.genSalt();

    // Hash plain password
    const hash = await bcrypt.hash(user.password, salt);

    // Replace plain-text password with hashed-password
    user.password = hash;

    const createdUser = new this.userModel(user);

    try {
      const result = await createdUser.save();
      return { id: result._id, name: result.name, email: result.email };
    } catch (err) {
      throw new HttpException(
        'Could not add user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

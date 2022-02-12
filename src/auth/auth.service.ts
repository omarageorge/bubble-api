import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthResDto } from './dto/auth-res.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<AuthResDto> {
    const user = await this.usersService.findByEmail(username);

    const validPassword = await bcrypt.compare(pass, user.password);

    if (user && validPassword) {
      return { id: user.id, name: user.name, email: user.email };
    }
    return null;
  }
}

import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthResDto } from './dto/auth-res.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<AuthResDto> {
    const user = await this.usersService.findByEmail(username);

    const validPassword = await bcrypt.compare(pass, user.password);

    if (user && validPassword) {
      return { id: user.id, name: user.name, email: user.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}

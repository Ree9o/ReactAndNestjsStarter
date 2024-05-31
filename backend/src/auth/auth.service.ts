import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtPayload.types';
import { SignInResponse } from './dto/signInResponce.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSevice: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userSevice.getUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
  async signIn(user: User): Promise<SignInResponse> {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return { accessToken: this.jwtService.sign(payload), user };
  }
}

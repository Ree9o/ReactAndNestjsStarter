import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignInResponse } from './dto/signInResponce.dto';
import { SignInInput } from './dto/signIn.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args(
      'signInInput', // gql-auth.gurdsのgetArgs()とチェーンしている名前と合わせる
    )
    signInInput: SignInInput,
    @Context() context: any,
  ) {
    return await this.authService.signIn(context.user); //localstorategy.tsのreturn userが格納される
  }
}

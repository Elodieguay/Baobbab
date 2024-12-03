import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDTO } from '../user/dto/user.dtos';


// import { CreateAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver(() => UserDTO)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,

  ) {}

  @Mutation(() => String)
  async login(
    @Args('username') userName: string, 
    @Args('password') password: string  
  ): Promise<string> {
    console.log('username dans le resolver:', userName);
    
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new HttpException('Invalid credentials Resolver', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.authService.login(user);
    return token.access_token;
  } 
 
  // @Mutation(() => String)
  // async register(
  //   @Args('userName') userName: string,
  //   @Args('password') password: string  
  // ){
  //   return this.authService.register(userName, password)
  // }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async protectedMutation() {
    return 'Vous êtes authentifié !';
  }



}

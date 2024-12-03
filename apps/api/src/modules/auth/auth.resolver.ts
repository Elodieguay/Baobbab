import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDTO } from '../user/dto/user.dtos';
import { UserCreateInput } from '../user/inputs/user-create.input';
import { User } from '../../entities/user.entity';


// import { CreateAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver(() => UserDTO)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    ) {}

  @Mutation(() => UserDTO)
  async register(
    @Args('createUserInput') createUserInput: UserCreateInput,
  ): Promise<UserDTO>{

    const user = await this.authService.register(createUserInput);
    return {...user, password: ''};
  }


  @Mutation(() => String)
  async login(
    @Args('username') username: string, 
    @Args('password') password: string  
  ): Promise<string> {
    console.log('username dans le resolver:', username);

    // On valide l'utilisateur
    const user = await this.authService.validateUser(username, password);
    console.log('user du login du resolver', user);
    
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // On génère le token
    const token = await this.authService.login(username);

    console.log("Token login du resolver", token);
    
    return token.access_token;
  } 


  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async protectedMutation() {
    return 'Vous êtes authentifié !';
  }



}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt'
// import { off } from 'process';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserCreateInput } from '../user/inputs/user-create.input';

@Injectable()
export class AuthService {
 constructor( 
  private readonly userService : UserService,
  private readonly jwtService : JwtService,
  private readonly configService: ConfigService
){}


async validateUser(username: string, password: string):Promise<any> {
  console.log('username de ValidateUser:', username);
  
  const user = this.userService.findOneUser(username);
  console.log('user trouvé:', user);
  
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare le mot de passe
    // const isPasswordValid = await this.userService.validatePassword(userName, password);
    // if (!isPasswordValid) {
    //   throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    // }

    if(password !== user.password){
      console.log('password incorrect');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if(user && user.password === password){
      console.log('password correct');
      const { password, ...result } = user;
      return result
    }
    console.log('user valid');
        return null
  }

    // Créer un JWT avec les informations de l'utilisateur

    async login(user: any) {
      const payload = { sub: user.id, username: user.userName };
      console.log('JWT_SECRET:', process.env.JWT_SECRET);

      const secret = this.configService.get('JWT_SECRET');
      console.log('secret dans AuthService:', secret);
      
      return {
        access_token: this.jwtService.signAsync(payload, {
          secret,
        }),
      };
    }

    // async register(username: string, password: string) {
    //   // hash password
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   // Pour le test, ajoutons un utilisateur fictif
    //   const user = { id: Date.now(), username, password: hashedPassword };
    //   return { username: user.username };
    // }
  
}
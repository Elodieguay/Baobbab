import { UserDTO } from "@baobbab/dtos/src/user.dto";
import { UserService } from "./user.service";
import { Body, Controller, Get} from "@nestjs/common";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    //Récuperer un utilisateur par son nom d'utilisateur

    @Get('user')
    async getUserByUsername(
        @Body('username') username: string
    ): Promise<UserDTO> {
        const user = await this.userService.findOneUser(username);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            ...user,
            password: '',
            created_at: user.createdAt,
            updated_at: user.updatedAt
        }
    }

    @Get('users')
    async getAllUsers(): Promise<Omit<UserDTO, 'password'>[]>{
        const users = await this.userService.findAllUsers();
        console.log('users', users);
        return users.map(({id, username, email, role, createdAt, updatedAt}) => ({id, username, email, role, created_at: createdAt, updated_at: updatedAt}))
    }

    

    
    
}
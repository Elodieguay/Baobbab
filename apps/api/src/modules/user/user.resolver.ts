import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserDTO } from "./dto/user.dtos";
import { User } from "../../entities/user.entity";
import { UserCreateInput } from "./inputs/user-create.input";

@Resolver(() => UserDTO)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    //Récuperer un utilisateur par son nom d'utilisateur
    @Query(() => UserDTO)
    async getUserByUsername(
        @Args('username') username: string
    ): Promise<UserDTO> {
        const user = await this.userService.findOneUser(username);
        if (!user) {
            throw new Error('User not found');
        }
        return user
    }


    
    
}
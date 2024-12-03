import { Field, ObjectType,ID } from "@nestjs/graphql";

@ObjectType()
export class UserDTO {
    @Field(() => ID)
    id!: string;

    @Field()
    username!: string;
    
    @Field()
    password!: string;
    
    @Field()
    email!: string; 
}
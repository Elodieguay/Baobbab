import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UserCreateInput {


    @Field({nullable:false})
    username!: string

    @Field({nullable:false})
    password!: string

    @Field({nullable:false})
    email!: string


}


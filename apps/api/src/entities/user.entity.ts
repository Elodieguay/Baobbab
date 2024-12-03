import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryKey({type: 'uuid', defaultRaw: 'gen_random_uuid()'})
    id!: string
    
    @Field()
    @Property({type: 'text', unique: true})
    username!: string
    
    @Field()
    @Property({type: 'text'})
    email!: string
    
    @Field()
    @Property({type: 'text'})
    password!: string
}

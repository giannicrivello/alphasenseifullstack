import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@ObjectType()
@Entity('techniques')
export class Technique extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column("text")
    title: string;


    @Field()
    @Column("text")
    description: string;


    @Field()
    @Column("text")
    image: string;
    
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    firstName: String;

    @Column()
    last_name: String;

    @Column({unique:true})
    email: String;

    @Column({select:true})
    password: string;

    @Column()
    is_ambassdor: boolean;

  

}
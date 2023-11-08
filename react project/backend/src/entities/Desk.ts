import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group";
import { User } from "./User";

@Entity("desk")
export class Desk{
    constructor(title:string){
        this.title = title;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: "Новая доска"
    })
    title: string;


    @OneToMany(() => Group, (group) => group.desk,  { cascade: true })

    groups: Group[]

    @ManyToOne(() => User, (user) => user.desks)
    user: User;

}


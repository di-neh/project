import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from "typeorm"
import { ToDo } from "./ToDo";
import { Desk } from "./Desk";

@Entity("groups")
export class Group {

    constructor(title:string){
        this.title = title
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:true
    })
    title: string

    @ManyToOne(() => Desk, (desk) => desk.groups)
    desk: Desk;


    @OneToMany(() => ToDo, (todo) => todo.group,  { cascade: true }) 
    todos: ToDo[]; 

}

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"
import { ToDo } from "./ToDo";

@Entity("groups")
export class Group {

    constructor(name:string, userId:number, id?:number){
        this.name = name,
        this.userId = userId,
        this.id = id === undefined ? null: id;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:true
    })
    name: string

    @Column()
    userId: number

    @OneToMany(() => ToDo, (todo) => todo.group) // Отношение One-to-Many с ToDo
    todos: ToDo[]; // Связь с задачами
}

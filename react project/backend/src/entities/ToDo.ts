import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Group } from "./Group";

@Entity("todos")
export class ToDo {

    constructor(title:string, description:string, group:Group, isCompleted?:boolean){
        this.title = title;
        this.description = description;
        this.group = group;
        this.isCompleted = isCompleted === undefined? this.isCompleted: isCompleted;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        nullable: true
    })
    description: string

    @Column({
        default: false
    })
    isCompleted: boolean

    @ManyToOne(() => Group, (group) => group.todos) 
    group: Group; 
}

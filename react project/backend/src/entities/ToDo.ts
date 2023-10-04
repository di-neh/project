import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("todos")
export class ToDo {

    constructor(title:string, description:string, group_id:number, isCompleted?:boolean){
        this.title = title;
        this.description = description;
        this.group_id = group_id;
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

    @Column()
    group_id: number
}

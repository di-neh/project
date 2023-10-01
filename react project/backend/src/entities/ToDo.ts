import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("todos")
export class ToDo {

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

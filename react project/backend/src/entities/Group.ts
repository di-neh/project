import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { User } from "./User"

@Entity("groups")
export class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    userId: number

    
}

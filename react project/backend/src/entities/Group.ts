import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"

@Entity("groups")
export class Group {

    constructor(name:string, userId:number, id?:number){
        this.name = name,
        this.userId = userId,
        this.id = id === undefined ? null: id;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    userId: number

    
}

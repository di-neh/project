import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, PrimaryColumn } from "typeorm"
import { User } from "./User"
import { EnumRoles } from "../common/enums"

@Entity("roles")
export class Role {

    constructor(name: String, id: number){
        this.name = name;
        this.id = id;
    };

    @PrimaryColumn()
    id: number

    @Column()
    name: String
}

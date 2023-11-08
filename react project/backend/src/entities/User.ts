import { Entity, 
    PrimaryGeneratedColumn, 
    Column, ManyToMany, 
    JoinTable, 
    OneToOne,
    JoinColumn,
    OneToMany} from "typeorm"
import { Role } from "./Role"
import { Token } from "./Token";
import { Desk } from "./Desk";

@Entity('users')
export class User {

    constructor(nickname:string, mail:string, password:string, roles?: Role[]){
        this.nickname = nickname;
        this.mail = mail;
        this.password = password;
        this.roles = roles;
    };

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    nickname: string

    @Column({
        unique: true
    })
    mail: string

    @Column()
    password: string

    @Column({
        default: null
    })
    profileImagePath: string

    @ManyToMany(
        () => Role
    )

    @JoinTable()
    roles: Role[]


    @OneToMany(() => Desk, (desk) => desk.user,  { cascade: true })

    desks: Desk[]
}

import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn, 
    OneToOne,
    JoinColumn} from "typeorm"
import { User } from "./User";

@Entity("tokens")
export class Token {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

}

import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Group } from "../entities/Group"
import { Role } from "../entities/Role"
import { ToDo } from "../entities/ToDo"
import { Token } from "../entities/Token"
import { Desk } from "../entities/Desk"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "postgres",
    password: "kalabass2299657",
    database: "Todo",
    synchronize: true,
    logging: false,
    entities: [User, Group, Role, ToDo, Token, Desk],
    migrations: [],
    subscribers: [],
})
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 3000,
//     username: "postgres",
//     password: "kalabass2299657",
//     database: "typeOrmPractice",
//     synchronize: true,
//     logging: false,
//     entities: [User, Group, Role, ToDo, Token, Desk],
//     migrations: [],
//     subscribers: [],
// })


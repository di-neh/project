import { validationResult, Result } from "express-validator";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../db/data-source"
import { EnumRoles } from "../common/enums";
import * as bcrypt from "bcrypt";
import { Role } from "../entities/Role";
import { cos } from "mathjs";
import { IUser } from "../common/interfaces";
import { serializeWithBufferAndIndex } from "typeorm/driver/mongodb/bson.typings";
import { Token } from "../entities/Token";

export interface IRequestBody{
    nickname: string,
    password: string,
    mail: string,
    roles?: number[],
    id?: number
}

export interface IRequestParams{
    id:number
}

export interface IUserswithRoles{
    
}

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const tokenRepository = AppDataSource.getRepository(Token);

export class UserController{
    async createUser(req:Request<{}, {}, IRequestBody>, res:Response){
        const errors: Result = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {nickname, password, mail, roles} = req.body;
            const hashPassword = bcrypt.hashSync(password, 6);

            let newUser = new User(nickname, mail, hashPassword);
            await userRepository.save(newUser);

            const userRoles:Role[] = [];

            for(let roleItem of roles){
                const role = await roleRepository.findOne({ where: { id:  roleItem} });
                if(role){
                    userRoles.push(role);
                }
            }

            if (userRoles.length > 0) {
                newUser.roles = userRoles;
                await userRepository.save(newUser);
            }

            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating user'});
        }
    }

    async getUsers(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            const usersWithRoles = await userRepository.find({ relations: ["roles"] });
            res.status(200).json(usersWithRoles);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating user'});
        }
    }

    async getOneUser(req:Request<IRequestParams, {}, IRequestBody>, res:Response){
        try {
            const user = await userRepository.findOne({relations: ["roles"], where:{id: req.params.id}});
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating user'});
        }
    }

    async updateUser(req:Request<{}, {}, IRequestBody>, res:Response){
        const errors: Result = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {nickname, password, mail, roles, id} = req.body;
            if(roles?.length == 0){
                let errors = [{message: "no roles", path: "roles"}];
                return res.status(400).json({errors: errors});
            }

            const userToUpdate = await userRepository.findOne({relations: ["roles"], where : {id: id}});
            if(userToUpdate == null){
                return res.status(400).json({errors: [{message: "no user given", path: "no user"}]});
            }

            userToUpdate.nickname = nickname;
            userToUpdate.mail = mail;
            userToUpdate.id = id;

            if(roles){
                const userRoles:Role[] = [];

                for(let roleItem of roles){
                    const role = await roleRepository.findOne({ where: { id:  roleItem} });
                    if(role){
                        userRoles.push(role);
                    }
                }

                if (userRoles.length > 0) {
                    userToUpdate.roles = userRoles;
                    await userRepository.save(userToUpdate);
                }
            }

            await userRepository.save(userToUpdate);

            res.status(200).json(userToUpdate);
            
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating user'});
        }
    }

    async deleteUser(req:Request<IRequestParams, {}, IRequestBody>, res:Response){
        console.log(1);
        try {
            const userToDelete = await userRepository.findOne({relations: ["roles"], where:{id: req.params.id}});
            if(userToDelete == null){
                return res.status(400).json({errors: [{message: "no user given", path: "no user"}]});
            }
            const token = await tokenRepository.findOne({where: {user: {id: userToDelete.id}}});
            if(token){
                console.log(1);
                await tokenRepository.remove(token);
            }
            await userRepository.remove(userToDelete);
            res.status(200).json(userToDelete);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating user'});
        }
    }
}
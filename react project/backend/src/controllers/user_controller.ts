import { validationResult, Result } from "express-validator";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../db/data-source"
import { EnumRoles } from "../common/enums";
import * as bcrypt from "bcrypt";
import { Role } from "../entities/Role";
import { cos, number } from "mathjs";
import { IUser } from "../common/interfaces";
import { serializeWithBufferAndIndex } from "typeorm/driver/mongodb/bson.typings";
import { Token } from "../entities/Token";
import { DataSource } from "typeorm";

export interface IRequestBody{
    nickname?: string,
    password?: string,
    passwordOld?: string,
    passwordNew?: string,
    mail?: string,
    roles?: number[],
    id?: number
}

export interface IRequestCookies{
    token?: string,
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
            let {nickname, password, mail, roles} = req.body;
            const hashPassword = bcrypt.hashSync(password, 6);

            let newUser = new User(nickname, mail, hashPassword);
            await userRepository.save(newUser);

            const userRoles:Role[] = [];

            if(roles === undefined){
                roles = [1];
            }

            for(let roleItem of roles){
                console.log(roleItem)
                const role = await roleRepository.findOne({ where: { id:  roleItem} });
                if(role){
                    userRoles.push(role);
                }
            }

            newUser.roles = userRoles;
            await userRepository.save(newUser);

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
            const {nickname,  mail, roles, id} = req.body;
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
            res.status(400).json({message:'Error during deleting user'});
        }
    }

    async registration(req:Request<{}, {}, IRequestBody>, res:Response){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await tokenRepository.clear();
            const {mail, nickname, password} = req.body;
            
            const hashPassword = bcrypt.hashSync(password, 6);

            let newUser = new User(nickname, mail, hashPassword);
            const role = await roleRepository.findOne({ where: { id: 1} });

            newUser.roles = [role];

            const token = bcrypt.hashSync(nickname + password + mail, 4);

            res.cookie('token', token);

            await userRepository.save(newUser);

            const newToken = new Token(token, newUser);
            await tokenRepository.save(newToken);

            res.status(200).json({newUser: newUser, message: 'Set Cookie'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Registration error'});
        }
    }

    async login(req:Request<{}, {}, IRequestBody>, res:Response){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log('PENIS');
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            console.log(req.body);
            await tokenRepository.clear();
            const {nickname, password} = req.body;

            const pretendent = await userRepository.findOne({where:{nickname: nickname}});

            if(!pretendent){
                let errors = [{message: "Wrong nickname", path: "nickname"},{message: "Wrong password", path: "password"}];
                return res.status(400).json({errors: errors});
            }

            if(!bcrypt.compareSync(password, pretendent.password)){
                let errors = [{message: "Wrong password", path: "password"}];
                return res.status(400).json({errors: errors});
            }

            const token = bcrypt.hashSync(nickname + password + Date.now(), 4);

            res.cookie('token', token);
            const newToken = new Token(token, pretendent);
            await tokenRepository.save(newToken);

            return res.status(200).json({message: 'Set Cookie'});

        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Registration error'});
        }
    }

    async getCookie(req:Request<{}, {}, {}, IRequestCookies>, res:Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const cookies: IRequestCookies = req.cookies;

            const token = await tokenRepository.findOne({where:{token: cookies.token}});

            if(!token){
                return res.status(403).json({message: 'pizda'})
            }

            return res.status(200).json({message: 'good'})

        } catch (error) {
            
        }
    }

    async logOut(req:Request<{}, {}, {}, IRequestCookies>, res:Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const cookies: IRequestCookies = req.cookies;

            const token = await tokenRepository.findOne({where:{token: cookies.token}});
            await tokenRepository.remove(token);

            return res.status(200).json({message: 'good'})

        } catch (error) {
            
        }
    }

    async changePaaword(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const {passwordNew, passwordOld } = req.body

            const cookies: IRequestCookies = req.cookies;

            const token = await tokenRepository.findOne({where:{token: cookies.token}});

            const user = token.user;

            if(!bcrypt.compareSync(passwordOld, user.password)){
                let errors = [{message: 'Введен неверный пароль', path: "passwordOld"}];
                return res.status(400).json({errors: errors});
            }

            const password = bcrypt.hashSync(passwordNew, 6);

            user.password = password;

            await userRepository.save(user);

            res.status(200).json(user);

            
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during chanching password'});
        }
    }
    async GetUserProfile(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }
            const cookies: IRequestCookies = req.cookies;
            const token = await tokenRepository.findOne({where:{token: cookies.token}, relations: ['user']});
            console.log(token.user);
            res.status(200).json(token.user);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during getting profile'}); 
        }
    }
}
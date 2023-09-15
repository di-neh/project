import { validationResult } from "express-validator";
import pool from "../db/db.js";
import bcrypt from "bcrypt";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = pool;

export class UserController{
    async createUser(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const {nickname, password, mail, roles} = req.body;
            if(roles.length == 0){
                let errors = [{message: "no roles", path: "roles"}];
                return res.status(400).json({errors: errors});
            }

            const hashPassword = bcrypt.hashSync(password, 6);
            const newPerson = await db.query('INSERT INTO users (nickname, mail, password) values ($1, $2, $3) returning *', [nickname, mail, hashPassword ]);

            await db.query('delete from user_roles where id = $1',[newPerson.rows[0].id]);

            for(let role_id of roles){
                await db.query('insert into user_roles (user_id, role_id) values ($1, $2)',[newPerson.rows[0].id, role_id]);
            }
            res.status(200).json(newPerson.rows[0]);
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Error during creating user'});
        }
    }

    async getUsers(req, res){
        try{
            let users = await db.query('select * from users');

            for(let user of users.rows){
                const roles = await db.query('select role_id from user_roles where user_id = $1', [user.id]);
                let roles_arr = [];
                roles.rows.forEach(element => {
                    roles_arr.push(element.role_id)
                });
                
                user.roles =  roles_arr;
            }

            res.status(200).json(users.rows);
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Error during getting all users'});
        }
    }

    async getOneUser(req, res){
        try{
            const nickname = req.params.nickname;
            const user = await db.query('select * from users where nickname = $1', [nickname]);
            res.status(200).json(user.rows[0]);
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Error during getting user'});
        }
    }

    async getUserProfile(req, res){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }
            const userId = await db.query('select user_id from users_tokens where token = $1', [req.cookies.token]);
            let user = await db.query('select * from users where id = $1', [userId.rows[0].user_id]);
            const roles = await db.query('select role_id from user_roles where user_id = $1', [user.rows[0].id]);


            let minRole = roles.rows[0].role_id;
            roles.rows.forEach(element => {
                if(minRole > element.role_id){
                    minRole = element.role_id;
                }
            });
            user.rows[0].role =  (await db.query('select name from roles where id = $1', [minRole])).rows[0].name;
            res.status(200).json(user.rows[0]);
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Error during getting profile'});
        }
    }

    async updateUser(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const {id, nickname, mail, roles} = req.body;

            if(roles.length == 0){
                let errors = [{message: "no roles", path: "roles"}];
                return res.status(400).json({errors: errors});
            }

            const user = await db.query('update users set nickname = $1, mail = $2 where id = $3 returning *', [nickname, mail, id]);

            await db.query('delete from user_roles where user_id = $1',[id]);

            for(let role_id of roles){
                await db.query('insert into user_roles (user_id, role_id) values ($1, $2)',[id, role_id]);
            }

            res.status(200).json(user.rows[0]);
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Error during update'});
        }
    }

    async deleteUser(req, res){
        try{
            const id = req.params.id;

            await db.query('delete from user_roles where id = $1', [id]);
            await db.query('delete from users_tokens where id = $1', [id]);
            const user = await db.query('delete from users where id = $1', [id]);
            res.status(200).json(user.rows[0]);
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Error during delete'});
        }
    }

    async registration(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const {nickname, password, mail} = req.body;

            const hashPassword = bcrypt.hashSync(password, 6);

            const user_id = await db.query('INSERT INTO users (nickname, mail, password) values ($1, $2, $3) returning id', [nickname, mail, hashPassword]);

            await db.query('INSERT INTO user_roles (user_id, role_id) values ($1, $2) ', [user_id.rows[0].id, 1]);
            
            await db.query(`delete from users_tokens where time > current_timestamp + interval '1 hour'`);
  
            const token = bcrypt.hashSync( nickname + password + mail, 6);
            res.cookie('token', token);

            res.status(200).send('Set Cookie');
            
            await db.query('insert into users_tokens (user_id, token) values ($1, $2) returning *',[ user_id.rows[0].id, token]);  
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Registration error'});
        }
    }

    async login(req, res){
        try{
            const {nickname, password} = req.body;
            const user =  await db.query('select * from users where nickname = $1', [nickname]);

            await db.query(`delete from users_tokens where time < current_timestamp + interval '1 hour'`);

            const token = bcrypt.hashSync( user.rows[0].nickname + user.rows[0].password + user.rows[0].mail , 6);
            res.cookie('token', token);

            res.status(200).send('Set Cookie');
            
            await db.query('insert into users_tokens (user_id, token) values ($1, $2)', [user.rows[0].id, token]);          
        }catch(e){
            console.log(e);
            res.status(403).json({message:'Login error'});
        }
    }

    async getCookie(req, res){
        try{  

            () => {
                res.send('Get Cookie');
                res.end;
            }

            const userId = await db.query('select user_id from users_tokens where token = $1', [req.cookies.token]);

            if(userId.rowCount == 0){
               return res.status(403).sendFile(path.resolve(__dirname, '../../front/pages/Auth_page.html'));
            }

            res.status(200).sendFile(path.resolve(__dirname, '../../front/pages/main.html'));
        }catch(e){
            console.log(e);
            res.status(400).json({message:'bad request'});
        }
    }

    async logOut(req, res){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }
            await db.query('delete from users_tokens where token = $1', [req.cookies.token]);
            res.status(200).json({message: "good"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'error during logging out'});
        }
    }

    async changePassword(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const {passwordOld, passwordNew} = req.body;
            console.log(req.body);

            const userId = await db.query('select user_id from users_tokens where token = $1', [req.cookies.token]);
            const user = await db.query('select password from users where id = $1', [userId.rows[0].user_id]);

            if(!bcrypt.compareSync(passwordOld, user.rows[0].password)){
                let errors = [{message: 'Введен неверный пароль', path: "passwordOld"}];
                return res.status(400).json({errors: errors});
            }

            const password = bcrypt.hashSync(passwordNew, 6);

            const newUser = await db.query('update users set password = $1 where id = $2 returning *', [password, userId.rows[0].user_id]);

            res.status(200).json(newUser.rows[0]);


        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Error during chanching password'});
        }
    }
}
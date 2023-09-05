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
        const {nickname, password, mail} = req.body;
        const newPerson = await db.query('INSERT INTO users (nickname, mail, password) values ($1, $2, $3) returning *', [nickname, mail, password ]);
        res.json(newPerson.rows[0]);
    }

    async getUsers(req, res){
        const users = await db.query('select * from users');
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const nickname = req.params.nickname;
        const user = await db.query('select * from users where nickname = $1', [nickname]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res){
        const {id, nickname, mail, password} = req.body;
        const user = await db.query('update users set nickname = $1, mail = $2, password = $3 where id = $4 returning *', [nickname, mail, password, id]);
        res.json(user.rows[0]);
    }
    async deleteUser(req, res){
        const id = req.params.id;
        const user = await db.query('delete from users where id = $1', [id])
        res.json(user.rows[0]);
    }

    async registration(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        try{
            
            const {nickname, password, mail} = req.body;

            const candidate = await db.query('select * from users where nickname = $1', [nickname]);

            if(candidate.rowCount > 0 ){
                return res.status(400).json({message: "пользователь с таким именем уже существует"})
            }

            const hashPassword = bcrypt.hashSync(password, 6);

            const user_id = await db.query('INSERT INTO users (nickname, mail, password) values ($1, $2, $3) returning id', [nickname, mail, hashPassword]);
            
            await db.query(`delete from users_tokens where time > current_timestamp + interval '1 hour'`);

            const token = bcrypt.hashSync( nickname + password + mail, 6);
            res.cookie('token', token);

            res.send('Set Cookie');
            
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

            if(user.rowCount == 0){
                return res.status(400).json({message: `Пользователь ${nickname} не найден`});
            }

            if(!bcrypt.compareSync(password, user.rows[0].password)){
                return res.status(400).json({message: 'Введен неверный пароль'});
            }  

            await db.query(`delete from users_tokens where time < current_timestamp + interval '1 hour'`);

            const token = bcrypt.hashSync( user.rows[0].nickname + user.rows[0].password + user.rows[0].mail , 6);
            res.cookie('token', token);

            res.send('Set Cookie');
            
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
               return res.status(401).json({message: 'not authorized'})
            }

            res.status(200).sendFile(path.resolve(__dirname, '../../front/pages/main.html'));
        }catch(e){
            console.log(e);
            res.status(400).json({message:'bad request'});
        }
    }
}
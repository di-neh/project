import pool from "../db/db.js";
import bcrypt from "bcrypt";
const db = pool;

export default async function loginMiddleware(req, res, next) {
    try{
        const {nickname, password} = req.body;
        const user =  await db.query('select * from users where nickname = $1', [nickname]);

        if(user.rowCount == 0){
            return res.status(400).json({message: `Пользователь ${nickname} не найден`});
        }

        if(!bcrypt.compareSync(password, user.rows[0].password)){
            return res.status(400).json({message: 'Введен неверный пароль'});
        }  

        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({message: ""});
    }  
}
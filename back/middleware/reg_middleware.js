import pool from "../db/db.js";
const db = pool;

export default async function regMiddleware(req, res, next) {
    try{
        const {nickname} = req.body;
        
        const candidate = await db.query('select * from users where nickname = $1', [nickname]);

        if(candidate.rowCount > 0 ){
            let errors = [{message: "пользователь с таким именем уже существует", path: "already_name"}];
            return res.status(400).json({errors: errors});
        } 

        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({message: "Инфа для разработчика!"});
    }  
}
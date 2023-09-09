import pool from "../db/db.js";
const db = pool;

export default function role_middleware(roles) {
    return async function(req, res, next){
        if(req.method == 'OPTIONS'){
            next();
        }

        try{
            const {nickname, password} = req.body;
            const user =  await db.query('select * from users where nickname = $1', [nickname]);
            const user_roles = await db.query('select * from user_roles where user_id = $1', [user.rows[0].id]);

            let user_roles_arr = [];

            for await (const element of user_roles.rows){
                const role_name = await db.query('select * from roles where id = $1', [element.role_id]);
                user_roles_arr.push(role_name.rows[0].name);
            }

            let hasRole = false;

            user_roles_arr.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            })

            if(!hasRole){
                return res.status(403).json({message: 'Доступ запрещен: Недостаточно прав доступа.'});
            }
            
            next();
        }
        catch(e){
            console.log(e);
            return res.status(403).json({message: ""});
        }
    }
}
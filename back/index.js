import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pool from "./db/db.js";
import router from "./router/user_router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5555;

const db = pool;

app.use(cookieParser());
app.use(express.json());
app.use(express.static('../front'));
app.use(router);

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/Auth_page.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/main.html'));
});


const AddMnager = async (id) =>{
    try {
        const managers = await db.query(
            `insert into "Managers" (man_id, d_id, f_name, s_name, percent, hire_d, comm, parent_id)
            values (${id}, 1, 'Железняк', 'Дмитрий', 60, '05-10-2003', 'пончик', 0) returning *`
        )
        console.log('-----------ADD-----------');
        console.log(managers.rows);
    } catch (e) {
        console.log(e);
    }
}

const UpdManager = async (percent, man_id) =>{
    try {
        const upd_manager = await db.query(
            `update "Managers" set percent = ${percent} where man_id = ${man_id} returning *`
        ) 
        console.log('-----------UPD-----------');
        console.log(upd_manager.rows);
    } catch (e) {
        console.log(e);
    }
}

const DelManager = async (id) =>{
    try {
        const del_manager = await db.query(
            `delete from "Managers" where man_id = ${id} returning *`
        ) 
        console.log('-----------DEL-----------');
        console.log(del_manager.rows);
    } catch (e) {
        console.log('Есть связанные записи, удалите сначала их');
    }
}

const top3 = async () => {
    try {
        const top3 = await db.query(
            `select man.*, sum(qty) sqty 
            from "Outgoing"outg
            join "Managers" man on man.man_id = outg.man_id
            group by man.man_id
            order by sqty desc
            limit 3` 
        )
        console.log('-----------SEL-----------');
        console.log(top3.rows);
    } catch (e) {
        console.log(e);
    }
}


app.listen(PORT, async ()=> {
    console.log('mamba out on', PORT);
    try {
       
        await AddMnager(124);
        await UpdManager(32);
        await DelManager(1);
        await top3();

    } catch (e) {
        console.log(e);
    }
    
});
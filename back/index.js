import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import router from "./router/user_router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5555;


app.use(cookieParser());
app.use(express.json());
app.use(express.static('../front'));
app.use(router);

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/login_page.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/main_page.html'));
});

app.listen(PORT, ()=> {
    console.log('mamba out on', PORT);
});
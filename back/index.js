import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from "./routes/user.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json());
app.use(router);
app.use(express.static('../front'));

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/enter_tm.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/pages/main.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('resurs not found');
})

app.listen(PORT, ()=> {
    console.log('mamba out');
});
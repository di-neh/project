import * as express from "express";
import * as morgan from "morgan"
import * as bodyParser from "body-parser"
import { UserRouter } from "./routers/user_router";
import * as cors from "cors";
import { TaskRouter } from "./routers/task_router";
import { GroupRouter } from "./routers/group_router";
import * as cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,DELETE, PUT',
    credentials: true
}));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(UserRouter, TaskRouter, GroupRouter);


app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


export default app;
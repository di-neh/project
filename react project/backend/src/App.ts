import * as express from "express";
import * as morgan from "morgan"
import * as bodyParser from "body-parser"
import { UserRouter } from "./routers/user_router";

const app = express();
app.use(morgan('tiny'));    
app.use(bodyParser.json());
app.use(UserRouter);


export default app;
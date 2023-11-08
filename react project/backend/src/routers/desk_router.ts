import * as express from "express"
import { DeskController } from "../controllers/desk_controller";

const controller = new DeskController();

const router = express.Router();

router.get('/desks', controller.GetDesks);

router.post('/desks', controller.AddDesk)

router.delete('/desks/:id', controller.DeleteDesk);


export {
    router as DeskRouter
}
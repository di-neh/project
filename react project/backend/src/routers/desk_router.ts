import * as express from "express"
import { DeskController } from "../controllers/desk_controller";

const controller = new DeskController();

const router = express.Router();

router.get('/desks', controller.GetDesks);

router.post('/desks', controller.AddDesk)
export {
    router as DeskRouter
}
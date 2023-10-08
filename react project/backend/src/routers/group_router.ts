import * as express from "express";
import { GroupController } from "../controllers/group_controller";

const controller = new GroupController();

const router = express.Router();

router.get('/groups', controller.GetGroups);

router.post('/groups', controller.CreateGroup);

router.delete('/groups/:id', controller.DeleteGroup);

router.put('/groups/:id', controller.UpdateGroup)

export {
    router as GroupRouter
}
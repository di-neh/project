import * as express from "express";
import { body, validationResult } from 'express-validator';
import { UserController } from "../controllers/user_controller";

const userController = new UserController();

const router =  express.Router();

router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getOneUser);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
export {
    router as UserRouter
}
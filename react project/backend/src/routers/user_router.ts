import * as express from "express";
import { body} from 'express-validator';
import { UserController } from "../controllers/user_controller";

const userController = new UserController();

const router =  express.Router();

router.post(
    '/user', 
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
    ],
    userController.createUser
);
router.post(
    '/registration',
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
    ], 
    userController.registration
);

router.post(
    '/login',
    [
        body('nickname').isLength({min:4}).withMessage('некорректное имя пользователя'),
        body('password').isLength({ min: 6 }).withMessage('некорректный пароль'),
    ],
    userController.login
);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getOneUser);
router.get('/main', userController.getCookie);
router.get('/userProfile', userController.GetUserProfile);

router.put('/users', userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

export {
    router as UserRouter
}
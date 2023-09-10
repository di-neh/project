import { Router } from "express";
import {UserController} from "../controller/user_controller.js";
import { body, validationResult } from 'express-validator';
import role_middleware from "../middleware/role_middleware.js";
import loginMiddleware from "../middleware/auth_middleware.js";


const router = new Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post(
    '/registration', 
    [
        body('nickname').isLength({min:4}).matches(/^[A-Za-z0-9]+$/).withMessage('некорректное имя пользователя'),
        body('mail').isEmail().withMessage('некорректный адрес электронной почты'),
        body('password').isLength({ min: 6 }).matches(/^[A-Za-z0-9]+$/).withMessage('некорректный пароль'),
        
    ],
    userController.registration
);  
router.post('/login',loginMiddleware, role_middleware(['admin', 'user']), userController.login);
router.get('/main', userController.getCookie);

export default router;
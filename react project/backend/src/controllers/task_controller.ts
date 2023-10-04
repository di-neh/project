import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { ToDo } from "../entities/ToDo";

const TaskRepository = AppDataSource.getRepository(ToDo);

interface IRequestBody{
    id?:number,
    title?:string,
    description?:string,
    isCompleted?:boolean,
    group_id?:number
}

export interface IRequestParams{
    id:number
}

export class TaskController{

    async CreateTask(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            const {title, description, isCompleted, group_id} = req.body;
            console.log(req.body);
            const task = new ToDo(title, description, group_id, isCompleted);
            await TaskRepository.save(task);
            return res.status(200).json(task);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during creating task'});
        }
    }

    async GetTasks(req:Request, res:Response){
        try {
            const tasks = await TaskRepository.find();
            return res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during getting tasks'});
        }
    }

    async GetTasksByGroupId(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            const tasks = await TaskRepository.find({where: {group_id: req.body.group_id}});
            return res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Error during getting tasks'});
        }
    }

    async GetOneTask(req:Request<IRequestParams, {}, {}>, res:Response){
        try {
            const task = await TaskRepository.findOne({ where:{id: req.params.id}});
            return res.status(200).json(task);
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Error during getting tasks'});
        }
    }

    async UpdateTask(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            const {id, title, description, isCompleted, group_id} = req.body;
            const task = await TaskRepository.findOne({ where:{id: id}});

            task.id = id == undefined ? task.id : id;
            task.title = title == undefined ? task.title : title;
            task.description = description == undefined ? task.description : description;
            task.isCompleted = isCompleted == undefined ? task.isCompleted : isCompleted;
            task.group_id = group_id == undefined ? task.group_id : group_id;

            await TaskRepository.save(task);

            return res.status(200).json(task);  
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Error during getting tasks'});
        }
    }

    async DeleteTask(req:Request<IRequestParams, {}, {}>, res:Response){
        try {
            const taskToDelete = await TaskRepository.findOne({where: {id: req.params.id}});
            if(taskToDelete == null){
                return res.status(400).json({errors: [{message: "no tasks given", path: "no task"}]});
            }
            await TaskRepository.remove(taskToDelete);
            return res.status(200).json(taskToDelete);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during deleting user"});
        }
    }
}
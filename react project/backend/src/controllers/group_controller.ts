import { Request, Response } from "express"
import { Group } from "../entities/Group";
import { AppDataSource } from "../db/data-source";
import { ToDo } from "../entities/ToDo";
import { User } from "../entities/User";
import { Token } from "../entities/Token";

interface IRequestBody{
    id?:number,
    name?:string, 
    userId?:number,
}

export interface IRequestParams{
    id:number
}

export interface IRequestCookies{
    token?: string,
}

const GroupRepository = AppDataSource.getRepository(Group);
const TaskRepository = AppDataSource.getRepository(ToDo);
const UserRepository = AppDataSource.getRepository(User);
const tokenRepository = AppDataSource.getRepository(Token);

export class GroupController{

    async CreateGroup(req:Request<{}, {}, IRequestBody>, res:Response){
        try {

            () => {
                res.send('Get Cookie');
                res.end;
            }

            const token = await tokenRepository.findOne({
                where:{token: req.cookies.token},
                relations: ['user']
            });
            
            const {id, name, userId} = req.body;
            const group = new Group(name, token.user.id);

            await GroupRepository.save(group);
            return res.status(200).json(group);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during creating group"});
        }
    }

    async DeleteGroup(req:Request<IRequestParams>, res:Response){
        try {
            const groupForDelete = await GroupRepository.findOne({where: {id: req.params.id}});

            if(groupForDelete == null){
                res.status(400).json({message: "no group given"});
            }

            await GroupRepository.remove(groupForDelete);

            const groupTasks = await TaskRepository.find({where:{group_id: groupForDelete.id}});

            for (const task of groupTasks) {
                await TaskRepository.remove(task);
              }

            res.status(200).json(groupForDelete);

        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error deleting creating group"});
        }
    }

    async GetGroups(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }
            const token = await tokenRepository.findOne({
                where:{token: req.cookies.token},
                relations: ['user']
            });
            
            const groups = await GroupRepository.find({where:{userId: token.user.id}});
            return res.status(200).json(groups);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error deleting getting group"});
        }
    }

    async UpdateGroup(req:Request<IRequestParams, {}, IRequestBody>, res:Response){
        try {
            const {name} = req.body;   
            const group = await GroupRepository.findOne({where:{id: req.params.id}});
            group.name = name;
            await GroupRepository.save(group);
            return res.status(200).json(group);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during updating group"});
        }
    }

}
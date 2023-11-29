import { Request, Response } from "express"
import { Group } from "../entities/Group";
import { AppDataSource } from "../db/data-source";
import { ToDo } from "../entities/ToDo";
import { User } from "../entities/User";
import { Token } from "../entities/Token";
import { Desk } from "../entities/Desk";

interface IRequestBody{
    id?:number,
    title?:string, 
    userId?:number,
    deskId?:number,
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
const deskRepository = AppDataSource.getRepository(Desk);

export class GroupController{

    async CreateGroup(req:Request<{}, {}, IRequestBody>, res:Response){
        try {
            const {title, deskId} = req.body;
            const desk = await deskRepository.findOne({
                where:{id: deskId}
            })
            const group = new Group(title);
            group.desk = desk;
            await GroupRepository.save(group);
            
            return res.status(200).json(group);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during creating group"});
        }
    }

    async DeleteGroup(req:Request<IRequestParams>, res:Response){
        try {
            const groupForDelete = await GroupRepository.findOne({relations:['todos'], where: {id: req.params.id}});

            if(groupForDelete == null){
                res.status(400).json({message: "no group given"});
            }
            await TaskRepository.remove(groupForDelete.todos);
            await GroupRepository.remove(groupForDelete);

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

            const groups = await GroupRepository.createQueryBuilder("group")
                .where("group.userId = :userId", { userId: token.user.id })
                .leftJoinAndSelect("group.todos", "todos")
                .orderBy("group.id", "ASC") 
                .addOrderBy("todos.id", "ASC") 
                .getMany(   );
                
            return res.status(200).json(groups);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error deleting getting group"});
        }
    }

    async UpdateGroup(req:Request<IRequestParams, {}, IRequestBody>, res:Response){
        try {
            const {title} = req.body;   
            const group = await GroupRepository.findOne({where:{id: req.params.id}});
            group.title = title;
            await GroupRepository.save(group);
            
            return res.status(200).json(group);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during updating group"});
        }
    }

}
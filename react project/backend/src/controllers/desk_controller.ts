import { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../db/data-source";
import { Group } from "../entities/Group";
import { ToDo } from "../entities/ToDo";
import { User } from "../entities/User";
import { Token } from "../entities/Token";
import { Desk } from "../entities/Desk";

export interface IRequestParams{
    id:number
}

export interface IRequestBody{
    title?:string,
}


const GroupRepository = AppDataSource.getRepository(Group);
const TaskRepository = AppDataSource.getRepository(ToDo);
const UserRepository = AppDataSource.getRepository(User);
const tokenRepository = AppDataSource.getRepository(Token);
const deskRepository = AppDataSource.getRepository(Desk);



export class DeskController{
    async GetDesks(req: Request, res: Response){
        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const token = await tokenRepository.findOne({
                where:{token: req.cookies.token},
                relations: ['user', 'user.desks', 'user.desks.groups', 'user.desks.groups.todos']
            });
            token.user.desks.sort((a, b) => a.id - b.id); 
            token.user.desks.forEach((desk) => {
                desk.groups.sort((a, b) => a.id - b.id);
                
                desk.groups.forEach((group) => {
                    group.todos.sort((a, b) => a.id - b.id);
                });
            })
            return res.status(200).json(token.user.desks);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during getting desks"});
        }
    }

    async AddDesk(req:Request<{}, {}, IRequestBody>, res:Response){

        try {
            () => {
                res.send('Get Cookie');
                res.end;
            }

            const token = await tokenRepository.findOne({
                where:{token: req.cookies.token},
                relations: ['user', 'user.desks']
            });

            const new_desk = new Desk(req.body.title);
            await deskRepository.save(new_desk);
            new_desk.user = token.user;

            const new_group1 = new Group("К работе");
            const new_group2 = new Group("В работе");
            const new_group3 = new Group("Готово");

            await GroupRepository.save([new_group1, new_group2, new_group3])

            new_desk.groups = [new_group1, new_group2, new_group3];

            await deskRepository.save(new_desk);

            new_desk.groups.sort((a, b) => a.id - b.id);

            return res.status(200).json(new_desk);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during getting desks"});
        }
    }


    async DeleteDesk(req:Request<IRequestParams>, res: Response){
        try {
            const deskForDelete = await deskRepository.findOne({
                relations: ['groups', 'groups.todos'],
                where: {id: req.params.id}
            });
            if(deskForDelete == null)
                res.status(400).json({message: "no desk given"});
            
            deskForDelete.groups.forEach(async (group) =>  {
                await TaskRepository.remove(group.todos);
            })
            await GroupRepository.remove(deskForDelete.groups);
            
            await deskRepository.remove(deskForDelete);
            res.status(200).json(deskForDelete);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "error during deleting desks"});
        }
    }

}
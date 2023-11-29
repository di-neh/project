
import {ReactNode} from "react";

export interface IToDoData{
    id?: number,
    title: string, 
    description: string, 
    isCompleted: boolean,
    group_id?:number,
}

export interface IRequestData{
    nickname?: string,
    password?: string,
    mail?:string,
}

export interface IBolvankaProps{
    title: string,
    id: number;
    tasks: IToDoData[];
    DeleteComponent: (id:number) => void;
    UpdateComponent: (id:number, newTitle:string) => void;
    onPopUpOpen?: () => void;
}

export interface IBolvankaKrugItem{
    textContent:string;
    id: number;
    isCheck: boolean;
    DeleteItem: (id:number) => void;
    tasks: IToDoData[];
}

export interface IBolvankaKrugTaskProps{
    onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; 
    onTextAreaChange: (value: string) => void;
    task?: string;
}

export interface IBolvankaKrugTitleProps{
    onInputChange : (value: string) => void;
    title: string
    children?: ReactNode;
}

export interface IUser{
    nickname?: string
    mail?: string
    password?: string
    roles?: {name: string, id: number}[]
    id?: number
    profileImagePath?: string
}

export interface IUserProfile{
    mail: string,
    nickname: string,
    profileImagePath?: string,
    roles?: {id:number, name:string}[]
}

export interface IRequestBody{
    nickname?: string,
    password?: string,
    passwordOld?: string,
    passwordNew?: string,
    mail?: string,
    roles?: number[],
    id?: number
}

export interface IGroupData{
    id: number,
    title: string,
    todos: IToDoData[]
}

export interface IDeskProps{
    id: number,
    title: string,
    groups:IGroupData[],
}



export interface ICustomError{
    response : {
        data : {
            errors: {
                path: string,
                message: string
            }[]
        }
    }
}
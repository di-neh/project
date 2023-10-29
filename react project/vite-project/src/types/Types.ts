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
    UpdateComponent: (id:number) => void;
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
}

export interface IUserProfile{
    mail: string,
    nickname: string,
    profileImagePath?: string
}

export interface IBolvankaData{
    id: number,
    title: string,
    tasks: IToDoData[]
}

export interface IGroupData{
    id: number,
    name: string,
    todos: IToDoData[]
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
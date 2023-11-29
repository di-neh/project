import axios from "axios";
import { IRequestBody, IRequestData, IUser, IUserProfile } from "../types/Types";

class UsersService{
    private Url = 'http://localhost:5661';

    async getAll(){
        return axios.get<IUser[]>(`${this.Url}/users`);
    }

    async getMain(){
        return axios.get<string>(`${this.Url}/main`);
    }

    async GetById(id: number){
        return axios.get<IUser>(`${this.Url}/users/${id}`);
    }

    async GetUserProfile(){
        return axios.get<IUserProfile>(`${this.Url}/userProfile`);
    }
    
    async GetUserProfileImage(){
        return axios.get<IUserProfile>(`${this.Url}/userProfileImage`);
    }

    async DeleteUser(id: number){
        return axios.delete<IUser>(`${this.Url}/users/${id}`);
    }

    async UpdateUser(user: IRequestBody){
        return axios.put<IUser>(`${this.Url}/users`,user);
    }

    async CreateUser(user: IRequestBody){
        return axios.post<IUser>(`${this.Url}/user`, user);
    }

    async Registration(user: IRequestData){
        return axios.post<Date>(`${this.Url}/registration`, user)
    }

    async Login(user: IRequestData){
        return axios.post<Date>(`${this.Url}/login`, user)
    }
    
    async UpdateUserProfile(){
        return axios.post<string>(`${this.Url}/upload`)
    }
}

export default new UsersService()
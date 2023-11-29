import axios from "axios";
import { IDeskProps } from "../types/Types";

class DeskService{
    private Url = 'http://localhost:5661/desks';
    async getAll(){
        return axios.get<IDeskProps[]>(this.Url);
    }

    async Delete(id:number){
        return axios.delete<IDeskProps>(`${this.Url}/${id}`);
    }

    async Create(){
        return axios.post<IDeskProps>(this.Url, {title: "Новая доска"});
    }
}

export default new DeskService()
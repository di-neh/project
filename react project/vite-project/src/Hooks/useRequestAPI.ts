import { IUserProfile } from "../types/Types";
import axios from "axios";

export function useRequestAPI(){
    const FetchProfile = async () => {
        try {
            const response:{data:IUserProfile} = await axios.get('http://localhost:5661/userProfile', {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });

            return response
        } catch (e) {
            console.error('Error fetching profile:', e);
            return null;
        }
    } 

    const FetchProfileImage = async () => {
        try {   
            const response:{data:File} = await axios.get('http://localhost:5661/userProfileImage', {
            responseType: 'blob'
            });
            return response
        } catch (e) {
            console.error('Error fetching profileImage:', e);
            return null;
        }
    }

    const requestOptions = {
        FetchProfile,
        FetchProfileImage,
    }
    return requestOptions;
}
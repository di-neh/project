import styled from "styled-components";
import Input from "../auth/Input.tsx";
import Header from "../ToDo/Header.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import logo from  "../ToDo/statics/копик.jpg";


const Box = styled.div`
  position: absolute;
  width: 600px;
  left: 30%;
  top: 100px;
  background: #383a3f;
  border-radius: 10px;
  padding-inline: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #ddd;
`

const BoxProfile = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
`

const BoxProfileImage = styled.div`
    height: 400px;
    width: 50%;
    padding: 2.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ProfileImg = styled.img`
    height: 90%;
    width: 95%;
    margin-top: 2.5%;
`

const BoxProfileInfo = styled.div`
    height: 400px;
    width: 50%;
    padding: 2.5%;
`
const H2 = styled.h2`
  margin-left: 15px;
  margin-bottom: 10px;
`

interface IUserProfile{
    mail: string,
    nickname: string,
    profileImagePath: string
}

interface IResponseData{
    data: IUserProfile;
}


const Profile = () => {

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");

    const [profileImgUrl, setProfileImgUrl] = useState<string>(logo);
    const [profileImgFile, setProfileImgFile] = useState<File>(logo);


    useEffect(()=> {
        FetchProfile();
        FetchProfileImage();
    }, []);

    const FetchProfile = async () => {
        try {
            const response:IResponseData = await axios.get('http://localhost:5661/userProfile', {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
            });

            const nickname = response.data.nickname;
            const mail = response.data.mail;

            setInputValue(nickname);
            setInputValue3(mail);
        } catch (e) {
            console.error('Error fetching profile:', e);
        }
    }

    const FetchProfileImage = async () => {
        const response = await axios.get('http://localhost:5661/userProfileImage', {
            responseType: 'blob'
        });
        const fileBlob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(fileBlob);
        setProfileImgUrl(imageUrl);
    }

    

    const updateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('image', profileImgFile);
            formData.append('username', inputValue);
            
            await axios.post('http://localhost:5661/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
                
            });

        } catch (e) {
            console.error('Error updating profile:', e);
        }
    }

    const HandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            console.log(selectedFile);
            console.log(selectedFile);
            setProfileImgUrl(URL.createObjectURL(selectedFile));
            setProfileImgFile(selectedFile);
        }
    }

    
    
    const InputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const InputFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2(e.target.value);
    };
    const InputMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue3(e.target.value);
    };

    

    return (
        <div>
            <Header  />
            <Box>
                <h1 style={{textAlign:"center"}}>Профиль</h1>
                <BoxProfile>
                    <BoxProfileImage>
                        <ProfileImg src = {profileImgUrl} alt="profile image "></ProfileImg>
                        <input type="file"  onChange={HandleFileChange}></input>

                    </BoxProfileImage>
                    <BoxProfileInfo>
                        <H2>Имя</H2>
                        <Input value={inputValue} ph={"Имя"} onChange={InputNameChange}></Input>
                        <H2>Фамилия</H2>
                        <Input value={inputValue2} ph={"фамилия"} onChange={InputFirstNameChange}></Input>
                        <H2>Почта</H2>
                        <Input value={inputValue3} ph={"Почта"} onChange={InputMailChange}></Input>
                    </BoxProfileInfo>
                </BoxProfile>
                <button onClick={updateProfile}>обновить профиль</button>
            </Box>
        </div>
    );
};

export default Profile;
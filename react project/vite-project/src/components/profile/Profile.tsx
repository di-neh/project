import styled from "styled-components";
import Input from "../auth/Input.tsx";
import Header from "../ToDo/Header.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
//@ts-ignore
import logo from "../../statics/копик.jpg";
import { useFormInput } from "../../Hooks/useFormInput.ts";
import { useRequestAPI } from "../../Hooks/useRequestAPI.ts";


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
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ProfileImg = styled.img`
    height: 90%;
    width: 95%;
    margin-top: 2.5%;
    margin-inline: 2.5%;
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

const Button__profile__update = styled.button`
    background-color: #6C78F4;
    height: 40px;
    width: 40%;
    border-radius: 7px;
    cursor: pointer;
    margin-left: 30%;
    margin-top: 10px;
`
const Button__profile__choose = styled.button`
    background-color: #6C78F4;
    height: 30px;
    width: 95%;
    border-radius: 7px;
    cursor: pointer;
    margin-top: 10px;
    margin-inline: 2.5%;


`

const Profile = () => {

    const nicknameInputProps = useFormInput(""); 
    const mailInputProps = useFormInput("");

    const [profileImgUrl, setProfileImgUrl] = useState<string>(logo);
    const [profileImgFile, setProfileImgFile] = useState<File>(logo);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(()=> {
        FetchProfile();
        FetchProfileImage();
    }, []);

    const openFilePicker = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
    }

    const HandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if(selectedFile){
            setProfileImgUrl(URL.createObjectURL(selectedFile));
            setProfileImgFile(selectedFile);
        }
    }

    const FetchProfile = async () => {
        const userProfile = await useRequestAPI().FetchProfile();
        if(userProfile){
            nicknameInputProps.setValue(userProfile.data.nickname);
            mailInputProps.setValue(userProfile.data.mail);
        }
    }

    const FetchProfileImage = async () => {
        const response = await useRequestAPI().FetchProfileImage();
        if(response){
            const fileBlob = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(fileBlob);
            setProfileImgUrl(imageUrl);
        }
    }

    const updateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('image', profileImgFile);
            formData.append('username', nicknameInputProps.value);
            
                await axios.post('http://localhost:5661/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
                
            });
            setProfileImgUrl(URL.createObjectURL(profileImgFile));
        } catch (e) {
            console.error('Error updating profile:', e);
        }
    }

    return (
        <div>
            <Header photo={profileImgUrl} />
            <Box>
                <h1 style={{textAlign:"center"}}>Профиль</h1>
                <BoxProfile>
                    <BoxProfileImage>
                        <ProfileImg src = {profileImgUrl} alt="profile image "></ProfileImg>
                        <input type="file" ref={fileInputRef} style = {{display: "none"}} onChange={HandleFileChange}></input>
                        <Button__profile__choose onClick={openFilePicker}>Выберите файл</Button__profile__choose>
                    </BoxProfileImage>
                    <BoxProfileInfo>
                        <H2>Имя</H2>
                        <Input  {...nicknameInputProps} ph="Имя"></Input>
                        {/* <H2>Фамилия</H2> */}
                        {/* <Input value="" ph={"фамилия"} onChange={() => {console.log('da')}}></Input> */}
                        <H2>Почта</H2>
                        <Input {...mailInputProps} ph={"Почта"}></Input>
                    </BoxProfileInfo>
                </BoxProfile>
                <Button__profile__update onClick={updateProfile}>обновить профиль</Button__profile__update>
            </Box>
        </div>
    );
};

export default Profile;
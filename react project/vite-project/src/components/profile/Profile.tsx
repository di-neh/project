import styled from "styled-components";
import Input from "../auth/Input.tsx";
import Header from "../ToDo/Header.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";


const Box = styled.div`
  position: absolute;
  width: 500px;
  left: 33%;
  top: 100px;
  background: #383a3f;
  border-radius: 10px;
  padding: 25px;
  color: #ddd;
`
const H2 = styled.h2`
  margin-left: 15px;
  margin-bottom: 10px;
`

interface IUserProfile{
    mail: string,
    nickname: string
}

interface IResponseData{
    data: IUserProfile;
}


const Profile = () => {


    useEffect(()=> {
        FetchProfile();

    }, []);

    const FetchProfile = async () => {
        try {
            const response:IResponseData = await axios.get('http://localhost:5661/userProfile', {
                headers: {'Content-Type': 'application/json'},
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


    const updateProfile = async () => {
        try {
            const response:IResponseData  = await axios.put('http://localhost:5661/users', {
                id: 7,
                nickname: inputValue,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            console.log(response)
        } catch (e) {
            console.error('Error updating profile:', e);
        }
    }

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState("");
    const InputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const InputFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2(e.target.value);
    };
    const InputMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue3(e.target.value);
    };

    const UpdateNameChange = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter' && !e.shiftKey) {
            updateProfile();
        }
    }


    return (
        <div>
            <Header></Header>
            <Box>
                <h1 style={{textAlign:"center"}}>Профиль</h1>
                <H2>Имя</H2>
                <Input value={inputValue} ph={"Имя"} onKeyDown={UpdateNameChange} onChange={InputNameChange}></Input>
                <H2>Фамилия</H2>
                <Input value={inputValue2} ph={"каво"} onChange={InputFirstNameChange}></Input>
                <H2>Почта</H2>
                <Input value={inputValue3} ph={"Почта"} onChange={InputMailChange}></Input>
            </Box>
        </div>
    );
};

export default Profile;
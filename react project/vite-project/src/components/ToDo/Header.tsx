import styled from "styled-components";
// @ts-ignore
import logo from  "../ToDo/statics/копик.jpg";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  background: #383a3f;
  color: white;
  display: flex;
  justify-content: space-between;
`

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
`
const Box1 = styled.div`
  margin-top: 8px;
  margin-left: 400px;
  font-size: 24px;
`
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`

interface AvatarProps {
  active: boolean;
}

const Avatar = styled.button<AvatarProps>`
  margin-left: 5px;
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
`

interface MenuProps {
  active: boolean;
}

const Menu = styled.nav<MenuProps>`
  position: absolute;
  top: 47px;
  right: 5px;
  width: 170px;
  padding: 15px;
  background: white;
  border: 1px solid black;
  border-radius: 7px;
  color: black;
  opacity: ${(props) => (props.active ? '1' : '0')};;
  transform: translateY(${(props) => (props.active ? '0' : '-10px')};);
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};;
  transition: 0.1s;
  //&:active{
  //  opacity: 1;
  //  transform: translateY(0);
  //  visibility: visible;
  //}
`
const Menu_list = styled.ul`
  margin: 0;
  width: 100%;
  padding: 0;
  list-style-type: none;

`
const Menu_item = styled.li`
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`

const Header = () => {


  interface IUserProfile{
    mail: string,
    nickname: string
  }

  interface IResponseData{
    data: IUserProfile;
}

  const [userProfile, setUserProfile] = useState<IUserProfile>({mail: '',nickname: ''});
  
  const navigate = useNavigate();

  useEffect(()=> {
    FetchProfile();

  }, []);

  const FetchProfile = async () => {
    try {
      const response:IResponseData = await axios.get('http://localhost:5661/userProfile', {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });

      setUserProfile({mail: response.data.mail, nickname: response.data.nickname});

    } catch (e) {
      console.error('Error fetching profile:', e);
    }
  }

  const HandlleButtonClick = async () => {
    try {
                navigate('/auth');
    
    } catch (e) {
        console.log(e);
    }   
}

    const [active, setActive] = useState(false);
    const offBtn = () =>{
        setActive(!active);
    }
    
    return (
        <Wrapper>
            <Box1>Brain</Box1>
            <Box2>
                <div>
                    <div style={{fontSize:10}}> {userProfile.mail} </div>
                    <div>{userProfile.nickname}</div>
                </div>
                <Avatar onClick={offBtn} active={active}>

                    <AvatarImg src={logo}></AvatarImg>
                </Avatar>
                <Menu active={active}>
                    <Menu_list>
                        <Menu_item>Профиль</Menu_item>
                        <Menu_item>Настройки</Menu_item>
                        <Menu_item>Ночной режим</Menu_item>
                        <Menu_item onClick={HandlleButtonClick}>Выход</Menu_item>

                    </Menu_list>
                </Menu>


            </Box2>
        </Wrapper>
    );
};

export default Header;

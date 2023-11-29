import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { IUserProfile } from "../../types/Types";

//@ts-ignore
import logo from  "../../statics/копик.jpg"; 
import { useRequestAPI } from "../../Hooks/useRequestAPI";



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
  margin-left: 700px;
  font-size: 24px;
  cursor: pointer;
`
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`
const Avatar = styled.button<AvatarProps>`
  margin-left: 5px;
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
`
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
  transform: translateY(${(props) => (props.active ? '0' : '-10px')});
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  transition: 0.1s;
  z-index: 100;

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

interface AvatarProps {
  active: boolean;
}

interface MenuProps {
  active: boolean;
}

interface IHeaderProps{
  photo?: string,
}

const Header:React.FC<IHeaderProps> = ({photo}) => {
  const [userProfile, setUserProfile] = useState<IUserProfile>({mail: '',nickname: ''});
  const [userProfileImage, setUserProfileImage] = useState<string>(photo? photo : logo);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(()=> {
    FetchProfile();
    FetchProfileImage();
  }, []);

  const FetchProfileImage = async () => {
    const response = await useRequestAPI().FetchProfileImage();
    if(response){
      const fileBlob = new Blob([response.data]);
      const imageUrl = URL.createObjectURL(fileBlob);
      setUserProfileImage(imageUrl);
    }
  }

  const FetchProfile = async () => {
    const userProfile = await useRequestAPI().FetchProfile();
    if(userProfile){
      setUserProfile({mail: userProfile.data.mail, nickname: userProfile.data.nickname});
      if(userProfile.data.roles[0].id == 0)
        setIsAdmin(true);
    }
  }

    const MainLink = async () =>{
        try {
            navigate('/main')
        }
        catch (e){
            console.log(e)
        }
    }

    const [active, setActive] = useState(false);
    const offBtn = () =>{
        setActive(!active);
    }

    const navigate = useNavigate();
    const HandlleButtonClick = async () =>{
        try {
            navigate('/auth')
        }
        catch (e){
            console.log(e)
        }
    }
    const ProfileLink = async () =>{
        try {
            navigate('/profile')
        }
        catch (e){
            console.log(e)
        }
    }

    const AdminLink = async () =>{
      try {
          navigate('/admin')
      }
      catch (e){
          console.log(e)
      }
  }

    return (
        <Wrapper>
            <Box1 onClick={MainLink}>Shlyapiki</Box1>

            <Box2>
                <div>
                    <div style={{fontSize:10}}> {userProfile.mail} </div>
                    <div>{userProfile.nickname}</div>
                </div>
                <Avatar onClick={offBtn} active={active}>

                    <AvatarImg src={userProfileImage}></AvatarImg>
                </Avatar>
                <Menu active={active}>
                    <Menu_list>
                        <Menu_item onClick={ProfileLink}>Профиль</Menu_item>
                        {isAdmin && <Menu_item onClick={AdminLink}>Админ</Menu_item>}
                        <Menu_item onClick={HandlleButtonClick}>Выход</Menu_item>

                    </Menu_list>
                </Menu>


            </Box2>
        </Wrapper>
    );
};

export default Header;

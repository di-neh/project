import styled from "styled-components";
import { useUsers } from "../../Hooks/useUsers.ts";
import Header from "../ToDo/Header.tsx";
import UserItem from "./UserItem.tsx";

const UsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const UsersHeader = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 50px;
  margin-top: 15px;
  width: 90%;
  padding: 5px;
  margin-left: 5%;
  gap: 10px;
  text-align: center;
  color: #6C78F4;
  font-size: 30px;
`
const Admin = () => {
    const {data} = useUsers()
    return (
        <div>
            <Header></Header>
            <UsersWrapper>
                <UsersHeader>
                    <div style={{width:"18%"}}>Id</div>
                    <div style={{width:"100%"}}>Nickname</div>
                    <div style={{width:"100%"}}>Mail</div>
                    <div style={{width:"100%"}}>Role</div>
                    <div style={{width:"100%"}}></div>
                </UsersHeader>
                {data?.map((user) => (
                    <UserItem {...user}></UserItem>
                ))}
            </UsersWrapper>
        </div>
    );
};

export default Admin;
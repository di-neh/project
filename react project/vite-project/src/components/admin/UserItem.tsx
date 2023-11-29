import React, {useState} from 'react';
import Input from "../auth/Input.tsx";
import styled from "styled-components";
import Button from "../auth/Button.tsx";
import {IRequestBody, IUser} from "../../types/Types.ts";
import {useFormInput} from "../../Hooks/useFormInput.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import userService from "../../services/user.service.ts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 50px;
  margin-top: 15px;
  width: 90%;
  padding: 5px;
  margin-left: 5%;
  gap: 10px;
  
  
`
const Select = styled.select`
  background: #383a3f;
  color: #ddd;
  border: none;
  border-radius: 10px;
  padding: 5px;
`

const UserItem:React.FC<IUser> = ({ id, nickname, mail, roles}) => {
    
    const nicknameInputProps = useFormInput(nickname);
    const mailInputProps = useFormInput(mail);

    const [selectValue, setSelectValue] = useState<number>(roles[0].id)
    const queryClient = useQueryClient();
    const UserDelMut = useMutation({
        mutationKey: ['delete users'],
        mutationFn: (id: number) => userService.DeleteUser(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["users"]})
        }

    })

    const UserUpdateMut = useMutation({
        mutationKey: ['update users'],
        mutationFn: (user: IRequestBody) => userService.UpdateUser(user),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["users"]})
        }

    })
    const onUpdate = () => {
        const user: IRequestBody = {
            id: id,
            nickname: nicknameInputProps.value,
            mail: mailInputProps.value,
            roles: [selectValue]
        }
        console.log(user.roles);
        UserUpdateMut.mutate(user)
    }
    const onDelete = () => {
        const user: IRequestBody = {
            id: id
        }
        UserDelMut.mutate(user.id)
    }
    return (
        <Wrapper>
            <div style={{color:'#ddd', width: '10%', fontSize: "30px"}}>{id}</div>
            <Input backgroundColor={'#383a3f'} ph={'имя'} {...nicknameInputProps}/>
            <Input backgroundColor={'#383a3f'} ph={'почта'} {...mailInputProps}/>
            <Select id={'role'} name={'role'} value={selectValue} onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setSelectValue(+e.target.value)}>
                <option value={0}>Админ</option>
                <option value={1}>Пользователь</option>
            </Select>
            <div style={{width: "100%", display: "flex"}}>
                <Button btnText={'Обновить'} onClick={onUpdate}></Button>
                <Button btnText={'Удалить'} onClick={onDelete}></Button>
            </div>
            
            
        </Wrapper>
    );
};

export default UserItem;
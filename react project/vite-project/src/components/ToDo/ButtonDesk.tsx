import styled from "styled-components";
import { IDeskProps } from "../../types/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deskService from "../../services/desk.service";

interface IButtonProps{
    desk?: IDeskProps,
    title?: string,
    onClick?: (desk: IDeskProps) => void,
    isAddBtn: boolean
}

const Button = styled.button`
    background-color: #6C78F4;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 7px;
    color: white;
    width: 100%;
    //padding: 10px;
    cursor: pointer;
`

const ButtonDesk:React.FC<IButtonProps> = ({desk, onClick, title, isAddBtn}) => {

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: () => deskService.Create(),
        mutationKey: ['update desk'],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['desks']});
        }
    })

    const OnClickHandler = () => {
        if(desk && onClick)
            onClick(desk);
        if(isAddBtn)
            createMutation.mutate();
    }

    return (
        <Button onClick={OnClickHandler}>
            {desk? desk.title : title}
        </Button>
    );
};

export default ButtonDesk;
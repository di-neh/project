import { useQuery } from "@tanstack/react-query"
import deskService from "../services/desk.service"

export const useDesks = () => {
    return useQuery({
        queryKey: ['desks'],
        queryFn: () => deskService.getAll(),
        select: ({data}) => data
    })
}
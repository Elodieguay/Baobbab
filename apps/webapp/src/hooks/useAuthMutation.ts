import { loginUser, registerUser } from "@/api/auth"
import { UserLoginDTO, UserRegisterDTO } from "@baobbab/dtos"
import { useMutation } from "@tanstack/react-query"



export const useRegisterMutation =()=>{
    return useMutation({
        mutationFn: (data:UserRegisterDTO)=>registerUser(data)
    }
)
}

export const useLoginMutation =()=>{
    return useMutation({
        mutationFn: (data:UserLoginDTO)=>loginUser(data)
    }
    )
}
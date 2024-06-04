import { InputSpace } from './InputStyled.jsx'

export function Input({type, placeholder, name, register}) {
    return(
        <InputSpace type={type} placeholder={placeholder} {...register(name)}/> 
    )
}
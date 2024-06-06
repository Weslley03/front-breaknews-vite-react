import { InputSpace, TextArea  } from './InputStyled.jsx'

export function Input({type, placeholder, name, register, isInput = true, value}) {

    let inputProps = {
        type, placeholder, ...register(name)
    }

    if(value) inputProps.value = value;

    return(
        <>
            {isInput ? 
            (<InputSpace {...inputProps}
            /> ) : (<TextArea {...inputProps} />)   
        }   
        </>
    )
}
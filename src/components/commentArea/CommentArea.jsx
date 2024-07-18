import { useState, useEffect } from 'react';
import { TextArea  } from './CommentAreaStyled.jsx'

export function CommentArea({type, placeholder, name, register, isInput = true, value: initialValue, disabled, onChange }) {

    const [ value, setValue ] = useState(initialValue || '');

    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    const handleChange = (e) => {
        setValue(e.target.value)
        if(onChange) {
            onChange(e)
        }
    }

    let inputProps = {
        type, placeholder, ...register(name), onChange: handleChange, disabled, value    
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
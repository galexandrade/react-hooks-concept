import { useState } from 'react';

//Custom hooks must start with 'use...' to stay in line with React conventions
export const useFormInput = () => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = event => {
        setValue(event.target.value);
        if (event.target.value.trim() === '')
            setValidity(false);
        else
            setValidity(true);
    }

    return { 
        value: value,
        onChange: inputChangeHandler,
        validity
    };
}
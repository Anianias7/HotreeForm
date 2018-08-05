import React from 'react'
import classes from './Time.css'
import style from '../../FormError/FieldError.css'

const Time = ({
                  type,
                  name,
                  placeholder,
                  required,
                  onChange,
                  error,
                  value
              }) => {
    const inputBorderColor = error ? style.ErrorBorderColor : classes.StandardTimeInputBorder;
    return (
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            className={[classes.TimeInput, inputBorderColor].join(' ')}
            placeholder={placeholder}
            onChange={(event) => onChange({event, required})}/>
    );
};

export default Time;
import React from 'react'
import classes from './Date.css'
import style from '../../FormError/FieldError.css'

const Date = ({
                  type,
                  dateName,
                  placeholder,
                  error,
                  onChange,
                  value,
                  required
              }) => {
    const inputBorderColor = error ? style.ErrorBorderColor : classes.DateInputStandardBorder;
    return (
        <input
            type={type}
            name={dateName}
            id={dateName}
            value={value}
            className={[classes.DateInput, inputBorderColor].join(' ')}
            placeholder={placeholder}
            onChange={(event) => onChange({event, required})}/>
    )
};

export default Date;
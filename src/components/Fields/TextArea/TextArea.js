import React from 'react'
import classes from './TextArea.css'
import style from '../../FormError/FieldError.css'

const TextArea = ({
                      name,
                      placeholder,
                      error,
                      required,
                      onChange,
                  }) => {
    const textAreaBorderColor = error ? style.ErrorBorderColor : classes.StandardTextAreaBorderColor;
    return (
        <textarea
            className={[classes.TextArea, textAreaBorderColor].join(' ')}
            id={name}
            name={name}
            maxLength={140}
            placeholder={placeholder}
            onChange={(event) => onChange({event, required})}
        />
    );
};

export default TextArea;
import React from 'react'
import classes from './ShortInput.css'

const ShortInput = ({
                        type,
                        name,
                        placeholder,
                        onChange,
                        onKeyPress,
                        value
                    }) => (
    <input
        type={type}
        name={name}
        id={name}
        value={value}
        className={classes.ShortInput}
        placeholder={placeholder}
        onChange={(event) => onChange({event})}/>
);

export default ShortInput;
import React, {Fragment} from 'react'
import classes from './RadioWithLabel.css'

const RadioWithLabel = ({
                            id,
                            name,
                            labelText,
                            checked,
                            onChange
                        }) => {
    return (<Fragment>
        <input
            id={id}
            type="radio"
            name={name}
            value={id}
            checked={checked}
            onChange={(event) => onChange({event})}
        />
        <label htmlFor={id} className={classes.RadioButtonLabel}>
            {labelText}
        </label>
    </Fragment>);
};

export default RadioWithLabel;
import React from 'react';
import classes from './SubLabel.css';

const SubLabel = ({
                      children,
                      name
                  }) =>
    (
        <label className={classes.DirectFieldLabel} htmlFor={name}>
            {children}
        </label>
    );

export default SubLabel;
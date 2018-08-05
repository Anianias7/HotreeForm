import React from 'react'
import classes from './Success.css'

const Success = () => (
    <div className={classes.Success}>
        <h2 className={classes.SuccessText}>Success</h2>
        <p className={classes.SuccessDescription}>Event has been created</p>
    </div>
);

export default Success;
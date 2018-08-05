import React from 'react'
import classes from './Info.css'

const Info = ({
                  informationList
              }) => {

    const fieldInformationList = informationList.map(info => <p key={info} className={classes.InfoElement}>{info}</p>);
    return <div className={classes.InfoWrapper}>
        <div className={classes.Info}>
            {fieldInformationList}
        </div>
    </div>

};

export default Info;
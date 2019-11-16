import React from 'react';

import classes from './UserBox.module.css'

import Button from '../../UI/Button/Button';

const userBox = (props) => {
    return (
        <div className={classes.UserBox}>
            <h3>{props.name}</h3>
            <div className={classes.Row}>
                <p>{props.email}</p>
                <p>{props.phone}</p>
            </div>
            <div className={classes.Row}>
                <p>{props.community}</p>
                <p>{props.organization}</p>
            </div>
            <div className={classes.Row}>
                <p>{props.role}</p>
                <Button clicked={props.modifyPermission}>Modify Permissions</Button>
            </div>
        </div>
    );
}
export default userBox;
import React from 'react';

import classes from './UserBox.module.css'

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const userBox = (props) => {
    console.log(props.authRole);
    let role = <p>{props.role}</p>
    if (props.authRole === 'admin') {
        const roleInput = {
            label: "Role",
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'admin', displayValue: 'Admin' },
                    { value: 'employee', displayValue: 'Employee' },
                    { value: 'user', displayValue: 'User' }
                ]
            },
            value: props.role
        };
        role = <Input
            changed={(event) => roleChanged(event)}
            elementType={roleInput.elementType}
            elementConfig={roleInput.elementConfig}
            value={roleInput.value}
            label={roleInput.label} />
    }

    const roleChanged = (event) => {
        event.preventDefault();
        props.updateRole(props.id, event.target.value);
    }

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
                {role}
                <Button btnType='ModifyPermissions' clicked={props.modifyPermissions}>Modify Permissions</Button>
            </div>
        </div>
    );
}
export default userBox;
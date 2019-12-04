import React from 'react';

import classes from './UserBox.module.css'

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const userBox = (props) => {
    let role = <p>{props.role}</p>
    let group = <p>{props.group}</p>
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
        const groupInput = {
            label: "Group",
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'community', displayValue: 'Community' },
                    { value: 'delgadoStaff', displayValue: 'Delgado Staff' },
                    { value: 'delgadoTeacher', displayValue: 'Delgado Teacher' },
                    { value: 'fabLabStaff', displayValue: 'FabLab Staff' },
                    { value: 'k12Mentor', displayValue: 'K-12 Mentor' },
                    { value: 'k12Teacher', displayValue: 'K-12 Teacher' },
                    { value: 'delgadoStudent', displayValue: 'Delgado Student' }
                ]
            },
            value: props.group
        };
        role = <Input
            changed={(event) => roleChanged(event)}
            elementType={roleInput.elementType}
            elementConfig={roleInput.elementConfig}
            value={roleInput.value}
            label={roleInput.label} />
        group = <Input
            changed={(event) => groupChanged(event)}
            elementType={groupInput.elementType}
            elementConfig={groupInput.elementConfig}
            value={groupInput.value}
            label={groupInput.label} />
    }

    const groupChanged = (event) => {
        event.preventDefault();
        props.updateGroup(props.id, event.target.value);
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
                <p>{props.gender}</p>
                <p>{props.organization}</p>
            </div>
            <div className={classes.Row}>
                {group}
            </div>
            <div className={classes.Row}>
                {role}
                <Button btnType='ModifyPermissions' clicked={props.modifyPermissions}>Modify Permissions</Button>
            </div>
        </div>
    );
}
export default userBox;
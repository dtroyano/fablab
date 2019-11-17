import React from 'react';

import classes from './ShowUsers.module.css';

import Aux from '../../hoc/Auxiliary';
import UserBox from './UserBox/UserBox';

const showUsers = (props) => {
    const usersArray = [];
    for (let key in props.users) {
        usersArray.push({
            id: key,
            data: props.users[key]
        });
    }
    let users = null;
    if (props.users) {
        users = (
            <div className={classes.Users}>
                {usersArray.map(user => (
                    <UserBox key={user.id}
                        id={user.id}
                        authRole={props.authRole}
                        updateRole={props.updateRole}
                        name={user.data.name}
                        email={user.data.email}
                        phone={user.data.phone}
                        community={user.data.community}
                        organization={user.data.organization}
                        role={user.data.role}
                        permissions={user.data.permissions}
                        modifyPermissions={() => props.modifyPermissions(user)} />
                ))}
            </div>
        );
    }
    return (
        <Aux>
            {users}
        </Aux>
    );
}

export default showUsers;
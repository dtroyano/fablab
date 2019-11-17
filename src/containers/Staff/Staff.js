import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import ModifyPermissions from '../../components/ShowUsers/ModifyPermissions/ModifyPermissions';
import Button from '../../components/UI/Button/Button'
import ShowUsers from '../../components/ShowUsers/ShowUsers';

class Staff extends Component {
    state = {
        showUsers: false,
        showScanner: false,
        showData: false,
        modifyPermissions: false,
        modifyPermissionsUser: {}
    }

    showUsers = (event) => {
        event.preventDefault();
        this.setState({ showScanner: false, showData: false, showUsers: true })
        this.props.onGetUsers()
    }

    showData = (event) => {
        event.preventDefault();
        this.setState({ showScanner: false, showData: true, showUsers: false })
    }

    showScanner = (event) => {
        event.preventDefault();
        this.setState({ showScanner: true, showData: false, showUsers: false })
    }

    modifyPermissions = (user) => {
        this.props.initResources();
        this.setState({ modifyPermissions: true, modifyPermissionsUser: user })
    }

    closeModify = () => {
        this.setState({ modifyPermissions: false });
    }
    updatePermissions = (event, permissions) => {
        event.preventDefault();
        const updatedUser = { ...this.state.modifyPermissionsUser }
        let newPermissions = {};
        for (let key in permissions) {
            if (permissions[key].elementConfig.checked) {
                newPermissions[key] = permissions[key].label;
            }
        }
        updatedUser.data.permissions = newPermissions;
        this.props.onUpdateUser(updatedUser.data, updatedUser.id);
        this.closeModify();
    }

    updateRole = (id, role) => {
        const updatedUser = { ...this.props.users[id] };
        updatedUser.role = role;
        this.props.onUpdateUser(updatedUser, id);
        this.setState({ showUsers: false })
    }

    render() {
        let showInfo = null;
        if (this.state.showUsers) {
            showInfo = <ShowUsers
                authRole={this.props.role}
                updateRole={this.updateRole}
                users={this.props.users}
                modifyPermissions={this.modifyPermissions} />
        }
        if (this.state.showData) {
            showInfo = <p>DATA</p>
        }
        if (this.state.showScanner) {
            showInfo = <p>SCANNER</p>
        }
        return (
            <div>
                {this.state.modifyPermissions
                    ? <ModifyPermissions
                        resources={this.props.resources}
                        user={this.state.modifyPermissionsUser.data.permissions}
                        closeModify={this.closeModify}
                        updatePermissions={this.updatePermissions} />
                    : null}
                <Button clicked={this.showScanner}>SCANNER</Button>
                <Button clicked={this.showUsers}>USERS</Button>
                <Button clicked={this.showData}>TRACKING DATA</Button>
                {showInfo}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.auth.users,
        role: state.auth.user.role,
        resources: state.resources.resources
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () => dispatch(actions.getUsers()),
        initResources: () => dispatch(actions.initResources()),
        onUpdateUser: (user, id) => dispatch(actions.updateUserDatabase(user, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Staff);
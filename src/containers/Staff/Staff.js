import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CSVDownload } from 'react-csv';

import ModifyPermissions from '../../components/ShowUsers/ModifyPermissions/ModifyPermissions';
import Button from '../../components/UI/Button/Button'
import ShowUsers from '../../components/ShowUsers/ShowUsers';
import ShowResources from '../../components/ShowResources/ShowResources';
import ChangeResources from '../ResourceCalendar/ChangeResources/ChangeResources';
import Scanner from './Scanner/Scanner';
import TrackingData from '../../components/TrackingData/TrackingData';

class Staff extends Component {
    state = {
        showUsers: false,
        showScanner: false,
        showData: false,
        deleteData: false,
        showResources: false,
        modifyPermissions: false,
        changeResources: false,
        modifyPermissionsUser: {}
    }
    showFalse = () => {
        this.setState({ showScanner: false, showData: false, showUsers: false, showResources: false });
    }

    showUsers = (event) => {
        event.preventDefault();
        this.showFalse();
        this.setState({ showUsers: true })
        this.props.onGetUsers()
    }

    showData = (event) => {
        event.preventDefault();
        this.showFalse();
        this.setState({ showData: true })
    }

    showScanner = (event) => {
        event.preventDefault();
        this.showFalse();
        this.setState({ showScanner: true })
    }

    showResources = (event) => {
        event.preventDefault();
        this.showFalse();
        this.setState({ showResources: true });
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

    updateGroup = (id, group) => {
        const updatedUser = { ...this.props.users[id] };
        updatedUser.group = group;
        this.props.onUpdateUser(updatedUser, id);
        this.setState({ showUsers: false })
    }

    modifyResources = () => {
        this.setState({ changeResources: !this.state.changeResources })
    }

    downloadCSV = (event) => {
        event.preventDefault();
        this.props.onLoadCSVData();
    }

    deleteDataToggle = (event) => {
        event.preventDefault();
        this.setState({ deleteData: !this.state.deleteData });
    }

    deleteData = (event) => {
        event.preventDefault();
        this.setState({ deleteData: false });
        this.props.onDeleteCSVData();
    }

    render() {
        let showInfo = null;
        if (this.state.showUsers) {
            showInfo = <ShowUsers
                authRole={this.props.role}
                updateRole={this.updateRole}
                updateGroup={this.updateGroup}
                users={this.props.users}
                modifyPermissions={this.modifyPermissions} />
        }
        if (this.state.showData) {
            showInfo = <TrackingData
                downloadCSV={this.downloadCSV}
                deleteDataToggle={this.deleteDataToggle}
                showDeleteData={this.state.deleteData}
                deleteData={this.deleteData} />
        }
        if (this.state.showScanner) {
            showInfo = <Scanner />
        }
        if (this.state.showResources) {
            showInfo = <ShowResources
                modifyResources={this.modifyResources} />
        }
        let downloadData = null;
        if (this.props.dataLoaded) {
            const headers = [
                { label: 'Check In', key: 'checkIn' },
                { label: 'Check Out', key: 'checkOut' },
                { label: 'Gender', key: 'gender' },
                { label: 'Group', key: 'group' },
                { label: 'Organization', key: 'organization' },
                { label: 'Reason', key: 'reason' }
            ];
            const data = [];
            for (let key in this.props.data) {
                data.push({ ...this.props.data[key] })
            }
            downloadData = <CSVDownload data={data} headers={headers} />;
        }
        return (
            <div>
                {this.state.changeResources
                    ? <ChangeResources
                        close={this.modifyResources}
                        resources={this.props.resources} />
                    : null
                }
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
                <Button clicked={this.showResources}>RESOURCE CALENDAR</Button>
                {showInfo}
                {downloadData}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.auth.users,
        role: state.auth.user.role,
        resources: state.resources.resources,
        dataLoaded: state.tracking.dataLoaded,
        data: state.tracking.data
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () => dispatch(actions.getUsers()),
        initResources: () => dispatch(actions.initResources()),
        onUpdateUser: (user, id) => dispatch(actions.updateUserDatabase(user, id)),
        onLoadCSVData: () => dispatch(actions.loadCSVData()),
        onDeleteCSVData: () => dispatch(actions.deleteCSVData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Staff);
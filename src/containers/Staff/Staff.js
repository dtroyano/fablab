import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button'
import ShowUsers from '../../components/ShowUsers/ShowUsers';

class Staff extends Component {
    state = {
        showUsers: false,
        showScanner: false,
        showData: false,
        modifyPermissions: false
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
        console.log(user);
    }

    render() {
        let showInfo = null;
        if (this.state.showUsers) {
            showInfo = <ShowUsers users={this.props.users} modifyPermissions={this.modifyPermissions} />
        }
        if (this.state.showData) {
            showInfo = <p>DATA</p>
        }
        if (this.state.showScanner) {
            showInfo = <p>SCANNER</p>
        }
        return (
            <div>
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
        users: state.auth.users

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () => dispatch(actions.getUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Staff);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';

class User extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        role: state.auth.user.role,
        userLoaded: state.auth.user.userLoaded
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
        onGetUserForState: (id) => dispatch(actions.getUserForState(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);

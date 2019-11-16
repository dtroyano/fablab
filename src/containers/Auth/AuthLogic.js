import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


import Aux from '../../hoc/Auxiliary';

class AuthLogic extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <Aux>
                {this.props.children}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogic);
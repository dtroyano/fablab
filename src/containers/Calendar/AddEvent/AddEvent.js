import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import axios from '../../../axios-orders';

import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';
import PopupBox from '../../../components/UI/PopupBox/PopupBox';

class AddEvent extends Component {
    state = {
        popupOpen: true
    };

    render() {
        return (
            <Aux>
                <BackDrop show={this.state.popupOpen} />
                <PopupBox>
                    <p>THIS IS A POPUP</p>
                </PopupBox>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event) => dispatch(actions.addEvent(event)),
        onRecurringAdded: (event) => dispatch(actions.recurringAdded(event))
    }
}

export default connect(null, mapDispatchToProps)(AddEvent, axios);
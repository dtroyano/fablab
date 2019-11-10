import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';
import PopupBox from '../../../components/UI/PopupBox/PopupBox';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class ChangeResources extends Component {
    state = {
        popupOpen: true
    }
    render() {
        return (
            <Aux>
                <BackDrop show={this.state.popupOpen} />
                <PopupBox>
                    <form onSubmit={this.submitHandler}>
                        <p>I OPENED</p>
                        <Button clicked={this.props.close}>CLOSE</Button>
                        <Button clicked={this.submitHandler}>ADD EVENT</Button>
                    </form>
                </PopupBox>
            </Aux >
        );
    }
}

export default ChangeResources;
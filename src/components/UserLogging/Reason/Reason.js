import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PopupBox from '../../UI/PopupBox/PopupBox';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const reason = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClicked} />
        <PopupBox>
            <form>
                <Input
                    changed={(event) => props.inputChangedHandler(event, 'reason')}
                    elementType={props.form.elementType}
                    elementConfig={props.form.elementConfig}
                    value={props.form.value}
                    label={props.form.label}
                //invalid={!formElement.config.valid}
                //shouldValidate={formElement.config.validation}
                //touched={formElement.config.touched} 
                />
                <Button clicked={props.checkInUser}>CHECK IN</Button>
                <Button clicked={props.modalClicked}>Cancel</Button>
            </form>
        </PopupBox>
    </Aux>

)

export default reason;
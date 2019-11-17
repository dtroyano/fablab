import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary';
import PopUpBox from '../../UI/PopupBox/PopupBox';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './ModifyPermissions.module.css';

class ModifyPermissions extends Component {
    state = {
        selectForm: {},
        selectFormLoaded: false,
        permissions: {},
        permissionsLoaded: false
    }

    componentDidUpdate() {
        if (!this.state.permissionsLoaded) {
            this.setState({ permissions: { ...this.props.user }, permissionsLoaded: true })
        }
        if (!this.state.selectFormLoaded && this.state.permissionsLoaded) {

            let newForm = {};
            this.props.resources.forEach(i => {
                newForm[i.id] = (
                    {
                        label: i.name,
                        elementType: 'input',
                        elementConfig: {
                            type: 'checkbox',
                            checked: this.state.permissions[i.id]
                        }
                    })
            })
            this.setState({ selectForm: newForm, selectFormLoaded: true })
        }
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.selectForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.elementConfig.checked = !updatedElement.elementConfig.checked;
        updatedForm[inputId] = updatedElement;
        this.setState({ selectForm: updatedForm });
    }


    render() {
        console.log(this.state.permissions)

        let form = null;
        if (this.state.selectFormLoaded) {
            const formElementArray = [];
            for (let key in this.state.selectForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.selectForm[key]
                });
            }
            form = (<Aux>
                {
                    formElementArray.map(formElement => (
                        <Input
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            key={formElement.id}
                            elementId={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.label}
                        //invalid={!formElement.config.valid}
                        //shouldValidate={formElement.config.validation}
                        //touched={formElement.config.touched} 
                        />
                    ))
                }
            </Aux>);
        }
        return (
            <Aux>
                <Backdrop show={true} />
                <PopUpBox>
                    <form onSubmit={(event) => this.props.updatePermissions(event, this.state.selectForm)}>
                        {form}
                        <Button clicked={(event) => this.props.updatePermissions(event, this.state.selectForm)}>UPDATE</Button>
                        <Button clicked={this.props.closeModify}>CLOSE</Button>
                    </form>
                </PopUpBox>
            </Aux>
        );
    }
}

export default ModifyPermissions;
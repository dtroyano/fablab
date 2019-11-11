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
        popupOpen: true,
        resourceInput: {
            label: 'Resource',
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name of Resource'
            },
            value: '',
            id: 1
        },
        resourceForm: []

    }

    componentDidMount() {
        this.initializeForm();
    }

    initializeForm = () => {
        const resourceForm = [];
        for (var elem in this.props.resources) {
            const newElem = { ...this.state.resourceInput };
            newElem.value = this.props.resources[elem].name;
            newElem.id = this.props.resources[elem].id;
            resourceForm.push(newElem);
        }
        const emptyForm = { ...this.state.resourceInput };
        emptyForm.id = resourceForm[resourceForm.length - 1].id + 1
        resourceForm.push(emptyForm);
        this.setState({ resourceForm: resourceForm });
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = [...this.state.resourceForm];
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ resourceForm: updatedForm });
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        const updatedResource = [];
        for (var elem in this.state.resourceForm) {
            updatedResource.push({
                id: this.state.resourceForm[elem].id,
                name: this.state.resourceForm[elem].value
            })
        }
        this.props.onResourceUpdated(updatedResource);
        this.props.close()
    }

    removeResource = (event, id) => {
        event.preventDefault();
        const updatedForm = [...this.state.resourceForm];
        updatedForm.splice(id, 1);
        this.setState({ resourceForm: updatedForm });
    }

    addResource = (event) => {
        event.preventDefault();
        const updatedForm = [...this.state.resourceForm];
        const emptyForm = { ...this.state.resourceInput };
        emptyForm.id = updatedForm[updatedForm.length - 1].id + 1
        updatedForm.push(emptyForm);
        this.setState({ resourceForm: updatedForm });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.resourceForm) {
            formElementArray.push({
                id: key,
                config: this.state.resourceForm[key]
            });
        }
        let form = (<Aux>
            {
                formElementArray.map(formElement => (
                    <div key={formElement.id.toString() + "aux"}>
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
                        <Button clicked={(event) => this.removeResource(event, formElement.id)}>REMOVE</Button>
                    </div>
                ))
            }
        </Aux>);
        return (
            <Aux>
                <BackDrop show={this.state.popupOpen} />
                <PopupBox>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button clicked={this.addResource}>ADD RESOURCE</Button>
                        <Button clicked={this.props.close}>CLOSE</Button>
                        <Button clicked={this.submitHandler}>UPDATE RESOURCES</Button>
                    </form>
                </PopupBox>
            </Aux >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResourceUpdated: (resources) => dispatch(actions.updateResources(resources))
    }
}

export default connect(null, mapDispatchToProps)(ChangeResources, axios);
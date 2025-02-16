import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-date-picker';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input id={props.elementId} onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea id={props.elementId} onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select id={props.elementId} onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>)
            break;
        case ('date'):
            inputElement = <DatePicker id={props.elementId} value={props.value} onChange={props.dateTimeChanged}  {...props.elementConfig} />
            break;
        case ('datetime'):
            inputElement = <DateTimePicker onChange={props.dateTimeChanged} value={props.value} id={props.elementId} {...props.elementConfig} />
            break;
        default:
            inputElement = <input id={props.elementId} onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}
                {inputElement}
            </label>
        </div >
    );
};

export default input;
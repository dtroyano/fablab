import React from 'react';
import classes from './CalendarPopUp.module.css';

import Button from '../Button/Button';

const calendarPopUp = (props) => {
    let className = classes.Disabled;
    if (props.showEvent) {
        className = classes.CalendarPopUp;
    }
    //const options = {weekday: 'short', month: 'long',}
    //const start = `${props.popUpInformation.start.toDateString()} ${props.popUpInformation.start.toString()}`;
    return (
        <div className={className} style={{ top: props.popUpInformation.location.y, left: props.popUpInformation.location.x }}>
            <i className={"material-icons-outlined"} onClick={props.close}>cancel</i>
            <h3>{props.popUpInformation.title}</h3>
            <h4>Time</h4><span>{props.popUpInformation.time}</span><br />
            <Button clicked={props.removeEvent}>DELETE EVENT</Button>
            <Button clicked={props.updateEvent}>UPDATE EVENT</Button>
        </div>
    );
}

export default calendarPopUp;
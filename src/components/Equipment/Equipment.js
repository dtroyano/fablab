import React from 'react';

import BookButton from '../Navigation/BookButtons/BookButton/BookButton';

import classes from './Equipment.module.css';

const equipment = (props) => (
    <div className={classes.Container}>
        <ul className={classes.Button}>
            <BookButton link='/reserveEquipment'>RESERVE EQUIPMENT</BookButton>
        </ul>
        <h1>Policies</h1>
        <h3> Community Hours Policies </h3>
        <ol className={classes.List}>
            <li> Community Members can only book up to 2 hours of time per day. </li>
            <li> Community Members can not book more than 3 hours of time in two days.
                <ul>
                    <li> You are welcome to come work in the lab if the machine is available and the lab is open. </li>
                    <li> You can <b>not</b> reserve this time. </li>
                    <li> This is to give others a chance to use the machinery </li>
                </ul>
            </li>
            <li> Please do not book time to work on your files (CAD/CAM work). This should be completed before your reservation starts. You can come in and use the computer lab during open hours to work on your files. </li>
            <li> You can not book multiple machines at one time, this will result in all your bookings being deleted. </li>
            <li> Violating any safety rules will result in a warning for the first offense, a day ban for the second offense, and a week ban for the third. </li>
            <li> Only teachers and k-12 mentors are allowed to book the lab manager for dedicated help. </li>
            <li> Bookings should not be made more than one week in advance, these will be a higher risk of cancellation.. </li>
            <li> The computer lab does not need to be reserved for use. If it is reserved that means a class is going on in the computer lab and no computers are available. You are welcome to work in the computer lab whenever it is not booked and the lab is open. </li>
            <li> If you are a community member or individual student, all reservations can be canceled by the lab manager if the tool is needed for a K-12 group or Delgado group for a class. The lab manager will try to avoid this if possible. You will receive an email as soon as possible if this needs to happen. </li>
        </ol>

        For long 3D prints, please try to schedule them at the end of the day, so they can print overnight.

    </div>
);

export default equipment;
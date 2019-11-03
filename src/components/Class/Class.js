import React from 'react';

import BookButton from '../Navigation/BookButtons/BookButton/BookButton';

import classes from './Class.module.css';

const bookClass = (prop) => (
    <div className={classes.Container}>
        <ul className={classes.Button}>
            <BookButton link='/reserveClass'>SIGN UP FOR A CLASS</BookButton>
        </ul>
        <p>Our community classes are posted on Eventbrite. Classes are free!</p>
        <ol class="left-list">
            <li>Please email Joe Cantu with questions about community classes.</li>
            <li>Please email Zack Chauvin for details on scheduling K-12 classes.</li>
            <li>Please email Ellie Buehler for details on scheduling Delgado classes.</li>
        </ol>
    </div>
);

export default bookClass;
import React from 'react'
import classes from './Error.module.css';

const error = (props) => (
    <span className={classes.Error}>{props.children}</span>
)

export default error;
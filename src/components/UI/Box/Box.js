import React from 'react';

import classes from './Box.module.css';

const box = (props) => (
    <div className={classes.Box}>
        {props.children}
    </div>
);

export default box;
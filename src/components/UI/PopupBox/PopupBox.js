import React from 'react';

import classes from './PopupBox.module.css';

const popupBox = (props) => (
    <div className={classes.PopupBox}>
        {props.children}
    </div>
);

export default popupBox;
import React from 'react';

import Button from '../../components/UI/Button/Button'

import classes from './ShowResources.module.css';

const showResources = (props) => (
    <div>
        <Button clicked={props.modifyResources}>CHANGE RESOURCES</Button>
    </div>
);

export default showResources;
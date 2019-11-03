import React from 'react';

import classes from './SectionTwo.module.css';

const sectionTwo = (props) => (
    <div className={classes.Container}>
        <div className={classes.Title}>
            <h2>All the Tools You Need</h2>
            <p class="lead">Our equipment is yours to use &mdash; reserve in advance to guarantee availability.</p>
        </div>
        <div className={classes.FlexBoxes}>
            <div>
                <i class="material-icons md-48 ">desktop_windows</i>
                <h4>Design</h4>
                <p>Utilize the space and computers in our design lab to design and create just about anything.</p>
            </div>
            <div>
                <i class="material-icons md-48 ">fingerprint</i>
                <h4>Print</h4>
                <p>We have the ones with ink too, but we think the 3D printers are a little cooler.</p>
            </div>
            <div>
                <i class="material-icons md-48 ">build</i>
                <h4>Build</h4>
                <p>Get the job done with our laser cutter, 4x8 router, or vinyl cutter.</p>
            </div>
        </div>
    </div>
);

export default sectionTwo;
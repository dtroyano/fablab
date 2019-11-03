import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SectionOne.module.css';

import BookButtons from '../../Navigation/BookButtons/BookButtons';
import Box from '../../UI/Box/Box';

const sectionOne = (props) => (
    <div className={classes.Container}>
        <div className={classes.Title}>
            <h1> Come build with us.&nbsp;</h1>
            <p class="lead"> Calling all makers, new and old. </p>
            <BookButtons />
        </div>
        <div className={classes.Boxes}>
            <Box>
                <span>Classes</span>
                <p>Come learn something &mdash; classes are held every Monday and Wednesday evening.</p>
                <Link to='/class'>Class Schedule</Link>
            </Box>
            <Box>
                <span>Community Lab</span>
                <p>Come make something &mdash; the FabLab is open to the public 5 days a week.</p>
                <Link to='/calendar'>Lab Hours</Link>
            </Box>
            <Box>
                <span>What's Happening</span>
                <p>Come hang out with us &mdash; join us at lectures, workshops, and camps throughout the year.</p>
                <Link to='/calendar'>Event Schedule</Link>
            </Box>
        </div>
    </div>
);

export default sectionOne;
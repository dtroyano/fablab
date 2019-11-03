import React from 'react';

import SectionOne from './SectionOne/SectionOne';
import SectionTwo from './SectionTwo/SectionTwo';
import SectionThree from './SectionThree/SectionThree';
import Aux from '../../hoc/Auxiliary';

const homePage = (props) => (
    <Aux>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
    </Aux>
);

export default homePage;
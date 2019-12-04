import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Backdrop from '../UI/Backdrop/Backdrop';
import PopupBox from '../UI/PopupBox/PopupBox';
import Button from '../UI/Button/Button';

const trackingData = (props) => {
    let deleteForm = null;
    if (props.showDeleteData) {
        deleteForm = (
            <Aux>
                <Backdrop show={props.showDeleteData} clicked={props.deleteDataToggle} />
                <PopupBox>
                    <p>Are you sure you want to delete all the tracking data?</p>
                    <Button clicked={props.deleteData}>DELETE</Button>
                    <Button clicked={props.deleteDataToggle}>CANCEL</Button>
                </PopupBox>
            </Aux>
        )
    }
    return (
        <Aux>
            {deleteForm}
            <div>
                <Button clicked={props.downloadCSV}>DOWNLOAD DATA</Button>
                <Button clicked={props.deleteDataToggle}>DELETE DATA</Button>
            </div>
        </Aux>
    );
}

export default trackingData;
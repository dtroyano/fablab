import React from 'react';

const blogEntry = props => {
    console.log(props);
    let entry = null;
    if (props.loaded) {
        entry = (<div>
            <h1>{props.entry.title.rendered}</h1>
            <p>test</p>
        </div>);
    }
    return (
        { entry }
    );
}



export default blogEntry;
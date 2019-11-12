import React from 'react';

const blogEntry = props => {
    let entry = null;
    if (props.loaded) {
        entry = (<div>
            <h1>{props.entry.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: props.entry.content.rendered }} />
        </div>);
    }
    return (
        <div>
            {entry}
        </div>
    );
}



export default blogEntry;
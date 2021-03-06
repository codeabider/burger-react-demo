import React from 'react';

const withClass = ( props ) => {
    return (
        <div className={props.assignClass}>
            {props.children}
        </div>
    );
}

export default withClass;
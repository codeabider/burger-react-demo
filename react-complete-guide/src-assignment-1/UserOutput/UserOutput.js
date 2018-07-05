import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return ( 
        <div className="UserOutput">
            <p>User details:</p>
            <p>UserName: {props.username}</p>
        </div>
    )
}

export default userOutput;
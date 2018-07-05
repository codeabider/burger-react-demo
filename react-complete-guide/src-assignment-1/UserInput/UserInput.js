import React from 'react';

const userInput = (props) => {
    return <input type="text" onChange={props.changed} value={props.username} style={props.inputStyle}/>
}

export default userInput;
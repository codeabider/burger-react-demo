import React from 'react';
import Radium from 'radium';

import './Person.css';

const person = ( props ) => {
    const style = {
        '@media screen and (min-width: 730px)': {
            width: '650px'
        }
    };

    return (
        <div className="Person" style={style}>
            <p onClick={props.clicked}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default Radium(person);
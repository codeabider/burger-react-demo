import React from 'react';
import classes from './CockPit.css';
// import Aux from '../hoc/Auxi';

const cockPit = ( props ) => {
    const assignedClasses = [];
    if (props.persons.length <= 2)
        assignedClasses.push(classes.red);
    if (props.persons.length <= 1)
        assignedClasses.push(classes.bold);
    
    let btnClass = classes.ToggleBtn;
    if(props.showPersons)
        btnClass = [btnClass, classes.btnActive].join(' ');
            
    // using higher order component, we can simply wrap a bunch of elements so that we don't need unnecessary HTML elements like 'div' (react 16+)
    // apart from this, in react 16.2+, React.Fragment does the job of Aux internally; read https://reactjs.org/docs/fragments.html
    return (
        // <Aux>
        <React.Fragment>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>Remaining records: {props.persons.length}</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </React.Fragment>
        // </Aux>
    );
}

export default cockPit;
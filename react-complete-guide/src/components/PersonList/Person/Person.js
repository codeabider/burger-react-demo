import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
// import WithClass from '../../hoc/WithClass';
import withClassFunc from '../../hoc/withClassFunc';  //alternative and preffered approach
import { Authentication } from '../../../containers/App';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        console.log('[Person.js] Inside Constructor', props);
    }

    setFocusToFirst() {
        if (this.props.position === 0)
            this.inputRef.current.focus(); 
    }

    highLightLast( msg ) {
        // dont use ref for such manipulations
        this.inputRef.current.parentElement.style.backgroundColor = 'crimson'; 
        this.inputRef.current.parentElement.style.color = 'white'; 
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }
    
    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        // use 'refs' only in special cases such as focusing etc (refs is only available in stateful components)
        this.setFocusToFirst();            
    }

    componentDidUpdate() {
        this.setFocusToFirst();            
    }

    // component destruction hook
    componentWillUnmount() {
        console.log('[DESTROY Person.js] Inside componentWillUnmount()');
    }

    render() {
        console.log('[Person.js] Inside render()');

        return (
            <React.Fragment>
                <Authentication.Consumer>
                    { auth => auth ? <p style={{'fontSize': '10px', 'width': '44px', 'margin': '0', 'padding': '3px', 'background': 'lightgreen'}}>Authentic</p> : null}
                </Authentication.Consumer>
                <p className={classes['remove-elem']} onClick={() => this.props.clicked()}>I'm <strong>{this.props.name}</strong> and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <label htmlFor={`name${this.props.position}`} style={{margin: '0 20px 10px 0', display: 'inline-block'}}>Enter new name:</label>
                <input
                    id={`name${this.props.position}`}
                    ref={this.inputRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </React.Fragment>
        )

        // in react 16+, we can render jsx without wrapping: this is a work around using Array.
        // return [
        //     <p key="1" onClick={this.props.clicked}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
        //     <p key="2">{this.props.children}</p>,
        //     <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
        // ]
    }
}

// stateless to stateful, to demonstrate lifecycle hooks
// const person = ( props ) => {
//     return (
//         <div className={classes.Person}>
//             <p onClick={props.clicked}>I'm {props.name} and I am {props.age} years old!</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.changed} value={props.name} />
//         </div>
//     )
// };

// type checking props (doesn't work for functional components)
Person.propTypes = {
    changed: PropTypes.func,
    clicked: PropTypes.func,
    age: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.number
};
// more on PropTypes: https://reactjs.org/docs/typechecking-with-proptypes.html | https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/t/lecture/8302820?start=0

Person.defaultProps = {
    name: 'John Doe'    
};

// export default Person;
export default withClassFunc(Person, classes.Person);
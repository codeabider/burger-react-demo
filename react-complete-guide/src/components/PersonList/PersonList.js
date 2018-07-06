import React, { PureComponent } from 'react';
import Person from './Person/Person';

class PersonList extends PureComponent {
    // component creation hooks
    constructor( props ) {
        super(props);
        this.personToHighlight = React.createRef();
        console.log('[PersonList.js] Inside Constructor', props);
    }

    componentWillMount() {
        console.log('[PersonList.js] Inside componentWillMount()');
    }

    componentDidMount() {
        // can reach to services from updations here | cause side effects
        console.log('[PersonList.js] Inside componentDidMount()');
        // using reference to last Person input to call 'Person' method  | see console
        this.personToHighlight.current.highLightLast();
    }

    // component updation hooks (external - via props)
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE PersonList.js] Inside componentWillReceiveProps()', nextProps);
    }

    /*the check for shouldComponentUpdate() [old vs new check] implementation is carried out by default
    if we extend 'PureComponent' instead of 'Component' */
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE PersonList.js] Inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //             nextProps.clicked !== this.props.clicked ||
    //             nextProps.changed !== this.props.changed;
    //     // return true;
    //     // return false;
    //     // rendering stops if returned false. useful for optimization in certain cases
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE PersonList.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        // can reach to services from updations here | cause side effects
        console.log('[UPDATE PersonList.js] Inside componentDidUpdate()');
        // this.personToHighlight.current.highLightFirst();
    }

    render() {
        console.log('[PersonList.js] Inside render()');

        return (
            this.props.persons.map((person, index) => <Person
                name={person.name}
                age={person.age}
                key={person.id}
                position={index}
                ref={this.personToHighlight}
                clicked={() => this.props.clicked(index)}
                changed={(e) => this.props.changed(e, person.id)}
            // changed={this.changePersonName.bind(this, person.id)}
            />)
        )
    }
}

// converted stateless to above stateful to demo lifecycle hooks
// const personList = (props) => props.persons.map((person, index) => {
//     return <Person
//         name={person.name}
//         age={person.age}
//         key={person.id}
//         clicked={() => props.clicked(index)}
//         changed={(e) => props.changed(e, person.id)}
//         // changed={this.changePersonName.bind(this, person.id)}
//     />
// })

export default PersonList;
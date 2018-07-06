import React, { Component } from 'react';
// import './App.css'; //pre eject
import classes from './App.css'; //post eject: after configuring webpack css loader
import PersonList from '../components/PersonList/PersonList';
import CockPit from '../components/CockPit/CockPit';
// import WithClass from '../components/hoc/WithClass';
import withClassFunc from '../components/hoc/withClassFunc';  //alternative and preffered approach

export const Authentication = React.createContext(false);

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: this.personsList,
      otherState: 'some other value',
      showPersons: false,
      clickCount: 0,
      isAuthentic: false
    }
  }

  personsList = [
    { id: 1, name: 'Mr A', age: 28 },
    // { id: 2, age: 29 },  // test default propType
    { id: 2, name: 'Ms B', age: 29 },
    { id: 3, name: 'Mrs C', age: 26 }
  ];

  componentWillMount() {  //deprecated in 16+
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // component updation hooks (internal - via state changes)
  componentWillReceiveProps(nextProps) {  //deprecated in 16+
    console.log('[UPDATE App.js] Inside componentWillReceiveProps()', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
    // return true;
    return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons || nextState.isAuthentic !== this.state.isAuthentic || nextState.clickCount !== this.state.clickCount;
  }

  componentWillUpdate(nextProps, nextState) { //deprecated in 16+
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }

  // latest hooks in React 16 (see React documentation for details | 3 of prev hooks are deprecated)
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[LATEST UPDATE (16) App.js] Inside getDerivedStateFromProps()',nextProps, prevState);    

    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log('[LATEST UPDATE (16) App.js] Inside getSnapshotBeforeUpdate()');    
  }

  // preferred approach after react version update
  // state = {
  //   persons: [
  //     { id: 1, name: 'Mr A', age: 28 },
  //     { id: 2, name: 'Ms B', age: 29 },
  //     { id: 3, name: 'Mrs C', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  authenticate = () => {
    this.setState({ isAuthentic: true });
  }

  deletePerson = (index) => {
    const personsUpdated = [...this.state.persons];
    personsUpdated.splice(index, 1);
    this.setState({ persons: personsUpdated });
  }

  //could be done using 'index' also
  changePersonName = (event, pid) => {
    const personUpdatedIndex = this.state.persons.findIndex((p) => p.id === pid);
    const personUpdated = { ...this.state.persons[personUpdatedIndex] };

    personUpdated.name = event.target.value;

    const persons = [ ...this.state.persons ];
    persons[personUpdatedIndex] = personUpdated;

    this.setState({ persons: persons });
  }

  togglePersons = () => {
    const isPersonVisible = this.state.showPersons;
    // this.setState({ showPersons: !isPersonVisible });
    // note: setting some state, when new state depends on prev state should be done like this:
    this.setState( (prevState, props) => {
      return {
        showPersons: !isPersonVisible,
        clickCount: prevState.clickCount + 1
      }
    } );
    // view App state in React dev tools to see counter incrementing
    // note: 'setState' works asynchronously, thus above approach should be implemented in some cases to update state
  }

  render () {
    console.log('[App.js] Inside render()');

    let persons = null;

    if(this.state.showPersons) {
      persons = <React.Fragment>
                  <PersonList
                    persons={this.state.persons}
                    clicked={this.deletePerson}
                    changed={this.changePersonName}
                  />
                  <button onClick={this.authenticate}>Autheticate All</button>
                </React.Fragment>
    }

    return (
      <React.Fragment>
        <div className={classes.masterButtons}>
          <button onClick={() => this.setState({ showPersons: true })}>Show Persons</button>
          <button onClick={() => this.setState({ persons: this.personsList })}>Restore All</button>
        </div>
        <CockPit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersons}
        />
        {/* shares global state */}
        <Authentication.Provider value={this.state.isAuthentic}>
          {persons}
        </Authentication.Provider>
      </React.Fragment>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClassFunc(App, classes.App);

// note: REVISE LECTURES 102/ 103
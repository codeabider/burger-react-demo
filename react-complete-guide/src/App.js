import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Mr A', age: 28 },
      { id: 2, name: 'Ms B', age: 29 },
      { id: 3, name: 'Mrs C', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
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
    this.setState({ showPersons: !isPersonVisible });
  }

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    const classes = [];
    if(this.state.persons.length <= 2)
      classes.push('red');
    if(this.state.persons.length <= 1)
      classes.push('bold');

    let persons = null;

    if(this.state.showPersons) {
      persons = this.state.persons.map((person, index) => {
        return <Person 
                  name={person.name}
                  age={person.age}
                  key={person.id}
                  clicked={() => this.deletePerson(index)}
                  changed={(e) => this.changePersonName(e, person.id)}
                  // changed={this.changePersonName.bind(this, person.id)}
                />
      });
      style.backgroundColor = 'red';
    }

    return (
      <div className="App">
        <h1>This is React!</h1>
        <p className={classes.join(' ')}>Reactive Components</p>
        <button 
          style={style}
          onClick={this.togglePersons}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;

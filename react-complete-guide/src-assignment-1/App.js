import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    username: 'Mr A'
  }

  onInputChange = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    const inputStyle = {
      backgroundColor: 'black',
      color: 'yellow'
    };

    return (
      <div className="App">
        <h1>Assignment #1</h1>
        <UserInput
          changed={this.onInputChange}
          username={this.state.username}
          inputStyle={inputStyle}/>
        <UserOutput username={this.state.username}/>
        <UserOutput username={this.state.username}/>
        <UserOutput username={this.state.username}/>
      </div>
    );
  }
}

export default App;

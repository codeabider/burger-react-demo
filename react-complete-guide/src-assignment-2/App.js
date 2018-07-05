import React, { Component } from 'react';
import './App.css';

import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    textValue: ''
  };

  getTextLength = (event) => {
    const inputVal = event.target.value;

    this.setState({
      textValue: inputVal
    });
  }

  removeChar = (i) => {
    const currStrArr = this.state.textValue.split("");
    currStrArr.splice(i, 1);

    // const currTextVal = currStrArr.join().replace(/,/g, "");
    const currTextVal = currStrArr.join("");

    this.setState({
      textValue: currTextVal
    });
  }
  
  render() {
    let charComp = null;
    const currStrArr = this.state.textValue.split("");
    const inputLen = this.state.textValue.length;

    charComp = currStrArr.map((currentChar, index) => {
      return <CharComponent
                char={currentChar}
                key={index}
                clicked={() => this.removeChar(index)}
              />
    });

    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

        <input
          type="text"
          onChange={this.getTextLength}
          value={this.state.textValue}  
        />
        { inputLen ?
          <div>
            <p>Text length: {inputLen}</p>
            <ValidationComponent txtLen={inputLen} />
          </div>
          : null
        }
        {charComp}
      </div>
    );
  }
}

export default App;

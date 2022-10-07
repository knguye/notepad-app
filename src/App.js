import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  render () {
    return (
    <div className="App">
      <div className="App-header">
        <h1>Notes App</h1>
        <button>+</button>
      </div>
      <Board>
        <Note color="red" title="Note 1"/>
        <Note color="blue" title="Note 2"/>
      </Board>
    </div>
    );
  }
}


class Board extends React.Component {
  constructor(props){
    super(props);
    this.name = "Notepad"
  }

  render() {
    return (
      <div className="Board">
        {this.props.children}
      </div>
    );
  }
}

class Note extends React.Component{
  constructor(props){
    super(props);
  }

  resizeNote(){
    
  }

  render() {
    return (
    <div className={"Note Note-" + this.props.color} style={{ backgroundColor: this.props.color }} >
      <h2>{this.props.title}</h2>
      <textarea></textarea>
    </div>
    );
  }
}


export default App;

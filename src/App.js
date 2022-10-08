import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  renderAddPrompt(){
    return (
      <AddPrompt
        
      />
    )
  }

  render () {
    return (
    <div className="App">
      <div className="App-header">
        <h1>Notes App</h1>
        <AddButton/>
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
    this.state = {
      paused: false
    }
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
    this.state = {
      height: "50vh"
    }
  }

  // Unused, TODO: Use to change height based on textarea line breaks
  resizeNote(setHeight){
    this.setState = {
      height: setHeight
    }
  }

  render() {
    return (
    <div className={"Note Note-" + this.props.color} style={{ backgroundColor: this.props.color, height: this.state.height }} >
      <h2>{this.props.title}</h2>
      <textarea></textarea>
    </div>
    );
  }
}

function AddPrompt(){
  return (
    <div className="AddPrompt"></div>
  )
}

class AddButton extends React.Component{
  constructor(props){
    super(props);
  }

  openPrompt(){
    Board.setState = {
      paused: true
    }

    return <AddPrompt/>
  }

  render(){
    return (
      <button className="AddButton" onClick={this.openPrompt}>+</button>
    );
  }
}


export default App;

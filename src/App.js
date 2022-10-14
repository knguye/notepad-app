import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      showAddPrompt: false,
      nextNote: {
        color: "white",
        title: "Untitled",
        label: ""
      }
    };
    this.enableAddPrompt = this.enableAddPrompt.bind(this);
    this.cancelAddPrompt = this.cancelAddPrompt.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
  }

  enableAddPrompt() {
    this.setState({
      showAddPrompt: true
    });
  }

  cancelAddPrompt(){
    this.setState({
      showAddPrompt: false
    });
  }

  addNewNote(noteProperties){
    this.setState({
      nextNote: {
        color: noteProperties.color,
        title: noteProperties.title,
      }
    });
    
    console.log('HI');
    // TODO: Append Child as <Note/>
  }

  render () {
    return (
    <div className="App">
      <div className="App-header">
        <h1>Notes App</h1>
        <Button content="+" className="AddButton" onClick={this.enableAddPrompt}/>
      </div>
      <Board>
        <Note color="red" title="Note 1"/>
        <Note color="blue" title="Note 2"/>
      </Board>

      {this.state.showAddPrompt ? 
        <AddPrompt addAction={this.addNewNote} cancelAction={this.cancelAddPrompt}/> : null}
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

class AddPrompt extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="AddPrompt">
        <div className="AddPromptMenu">
          <AddForm onSubmit={this.props.addAction}/>
          <Button onClick={this.props.cancelAction} content={"Cancel"}/>
          </div>
      </div>
    );
  }
}

class AddForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      color: "white",
      title: "Untitled",
      label: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  handleTitleChange(event){
    this.setState({
      title: event.target.value,
    })

    console.log(this.state);
  }

  handleColorChange(event){
    this.setState({
      color: event.target.value,
    })

    console.log(this.state);
  }

  addNote(event){
    alert("form submitted");
    (event) => this.props.addAction(event, this.state)
    //event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.addNote}>
        <label>Title: </label><input type="text" onChange={this.handleTitleChange}></input>
        <br/>
        <label for="color">Color: </label><select name="color" onChange={this.handleColorChange}>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <br/>
        <input className="ButtonUI" type="submit" value="Add Note"/>
      </form>
    )
  }
}

class Button extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <button className="ButtonUI" {...this.props}>{this.props.content}</button>
    );
  }
}


export default App;

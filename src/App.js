import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { act } from 'react-dom/test-utils';

var activeNotes = []; 

class App extends React.Component {


  constructor(){
    super();

    activeNotes = JSON.parse(window.localStorage.getItem('activeNotes'));


    if (activeNotes === null || activeNotes === undefined){
      activeNotes = [];
    }

    this.state = {
      showAddPrompt: false,
      nextNote: {
        id: 0,
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
      showAddPrompt: false
    });
    
    const nextNote = {
      id: noteProperties.id,
      title: noteProperties.title,
      color: noteProperties.color,
      body: noteProperties.body
    }

    activeNotes.push(nextNote);
    localStorage.setItem('activeNotes', JSON.stringify(activeNotes));
  }

  editExistingNote(noteID, noteProperties){
    
    // TODO: Replace note with matching ID with this "new" edited note.
  }

  render () {
    const notes = activeNotes.map((val, i) => (
      <Note key={i} id={val.id} title={val.title} color={val.color} body={val.body} onChange={(i, val) => this.editExistingNote}></Note>
    ));
    

    return (
    <div className="App">
      <div className="App-header">
        <h1>Notes App</h1>
        <Button content="+" className="AddButton" onClick={this.enableAddPrompt}/>
      </div>
      <Board>
        {notes}
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
      height: "50vh",
      render: true,
      body: ""
    }

    this.deleteNote = this.deleteNote.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  deleteNote(event){
    this.setState({ render: false }, () =>
      {
        console.log("Deleting note with title " + this.props.title);
        
        var transformedArray = [];

        for (const note of activeNotes){
          const originalNoteID = this.props.id;

          // Match on ID and title
          if (originalNoteID === note.id && this.props.title === note.title){
          
          }
          else {
            transformedArray.push(note);
          }
        }

        // Overwrite activeNotes with the transformed Array
        activeNotes = transformedArray;

        localStorage.setItem('activeNotes', JSON.stringify(activeNotes));
      }
    );
  }

  handleBodyChange(event){
    this.setState({body: event.target.value}, () =>{
      // Transformed array of notes
      var transformedArray = [];

      // Find the note with the matching ID to the "original note" ( to be replaced )
      for (const note of activeNotes){
        const originalNoteID = this.props.id;

        // Match on ID and title
        if (originalNoteID === note.id && this.props.title === note.title){
          const newNote = {
            id: originalNoteID,
            color: note.color,
            title: note.title,
            body: event.target.value
          }
          transformedArray.push(newNote);
        }
        else {
          transformedArray.push(note);
        }
      }

      // Overwrite activeNotes with the transformed Array
      activeNotes = transformedArray;

      localStorage.setItem('activeNotes', JSON.stringify(activeNotes));
      }
    );
  }

  render() {
    const { render } = this.state;
    if (render === false) return null;
  
    return (
    <div className={"Note Note-" + this.props.color} style={{ backgroundColor: this.props.color, height: this.state.height }} >
      <h2 className="NoteTitle">{this.props.title}</h2> <Button content="-" className="DeleteButton" onClick={this.deleteNote}/>
      <br/><textarea className={"NoteTextarea NoteTextarea-" + this.props.color} onChange={this.handleBodyChange}>{this.props.body}</textarea>
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
          <AddForm addAction={this.props.addAction}/>
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
      id: 1, // TODO: Make random #
      color: "white",
      title: "Untitled",
      body: "",
      label: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleTitleChange(event){
    this.setState({ title: event.target.value }, () => {
      //console.log(this.state.title);
    })
  }

  handleColorChange(event){
    this.setState({ color: event.target.value }, () => {
      //console.log(this.state.color);
    })
  }

  handleBodyChange(event){
    this.setState({ body: event.target.value }, () => {
      //console.log(this.state.body);
    })
  }

  render(){
    return (
      <div>
      <h2>Create a Note: </h2>
      <form id="addform" onSubmit={() => this.props.addAction(this.state)}>
        <label>Title: </label><input type="text" onChange={this.handleTitleChange}></input>
        <br/><br/>
        <label htmlFor="color">Color: </label><select name="color" value={this.state.value} onChange={this.handleColorChange}>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
        <br/><br/>
        <textarea className="BodyEntry" form="addform" onChange={this.handleBodyChange}></textarea>

        <br/><br/>
        <input className="ButtonUI" type="submit" value="Add Note"/>
      </form>
      </div>
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

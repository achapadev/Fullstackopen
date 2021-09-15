import React, { useState } from "react"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  // value of state for notes is being set to array passed in via notes prop from index.js
  const [newNote, setNewNote] = useState("a new note...")
  // used to store user-submitted input, setNewNote to be set as input element's value attribute
  const [showAll, setShowAll] = useState(true)
  const addNote = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    // in this case the target is the form we have defined in component
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)
  // operator above functions like so: const result = condition ? val1 : val2
  // if condition is true result will be set to value of val1 otherwise if false will be set to val2

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        {/* the event handler is called every time a change occurs in the input element */}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App

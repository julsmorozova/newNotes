import React from 'react'
import styles from './notesBoard.scss'
import Note from './note'
import AddNoteForm from 'components/add_note_form'

const noteStyle = {
  width: 300,
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: '0.5rem',
  margin: '0 1rem 1rem 0'
}

class NotesBoard extends React.Component {

  makeNote() {
    if (this.props.notes) {
      return this.props.notes.map(note => {
        return (
          <Note key={note.id + Math.random()} note={note} deleteNote={this.props.deleteNote} />
        )
      })
    }
    return ''
  }

  render() {
    return (
      <div className={styles.notesBoard}>
        <AddNoteForm />
        {this.makeNote()}
      </div>
    )
  }
}

export default NotesBoard

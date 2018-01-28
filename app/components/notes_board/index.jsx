import React from 'react'
import Note from './note'
import AddNoteForm from 'components/add_note_form'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    listView: state.view.listView,
    deleted: state.notesState.deleted
  }
}

const notesBoardStyles = {
  width: '80%',
  margin: '1rem auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
}

class NotesBoard extends React.Component {

  makeNote() {
    if (this.props.notes) {
      return this.props.notes.map(note => {
        return (
          <Note key={note.id + Math.random()} note={note} />
        )
      })
    }
    return ''
  }

  render() {
    console.log('deleted', this.props.deleted)
    console.log(this.props.notes)
    return (
      <div
        style={this.props.listView ?
          {...notesBoardStyles,
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            width: '65%'} :
          notesBoardStyles}
      >
        <AddNoteForm />
        {this.makeNote()}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(NotesBoard)

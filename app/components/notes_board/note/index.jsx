import React from 'react'
import styles from './note.scss'
import { deleteNote, deleteNoteTodo, toggleNoteTodo } from 'core/actions'
import { connect } from 'react-redux'
import NoteList from 'components/note_list'
import IconButton from 'material-ui/IconButton'

const itemStyles = {
  backgroundColor: '#fff',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  margin: '0.25rem 0',
  padding: '0 0.5rem',
  color: '#777',
  fontSize: '0.85rem'
}

const iconStyle = {
  color: '#777',
  fontSize: '1rem'
}

const noteItem = {
  backgroundColor: '#eee',
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  padding: '1rem 0.8rem',
  width: '18.75rem',
  margin: '0 1rem 1rem 0',
  boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  borderRadius: '0.125rem'
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id)),
    toggleNoteTodo: (id) => dispatch(toggleNoteTodo(id)),
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id))
  }
}

class Note extends React.Component {
  render() {
    const { note, deleteNote, deleteNoteTodo, toggleNoteTodo } = this.props
    // console.log(note)
    // console.log(note.noteTodos)
    return (
      <div style={noteItem}>
        <span className={styles.noteTitle}>{note.title}</span>
        <IconButton
          iconClassName='material-icons'
          iconStyle={iconStyle}
          onClick={() => (deleteNote(note.id))}
          style={{display: 'flex', width: '0.8rem', height: '1.5rem', padding: 0, margin: '-0.7rem 0'}}
        >
          clear
        </IconButton>
        <span className={styles.noteText}
          style={!note.todos ? {display: 'flex'} :
            note.text ? {display: 'flex'} : {display: 'none'}}
        >
          {note.text}
        </span>
        <div className={styles.todoList}>
          <NoteList noteTodos={note.noteTodos} toggleNoteTodo={toggleNoteTodo} deleteNoteTodo={deleteNoteTodo} />
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Note)

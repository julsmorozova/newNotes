import React from 'react'
import styles from './note.scss'
import {
  deleteNote,
  deleteNoteTodo,
  toggleNoteTodo,
  editNoteText
} from 'core/actions'
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
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id)),
    onCompleteClick: (id, text) => dispatch(editNoteText(id, text))
  }
}

class Note extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     value: props.note.text,
     editable: false
   }
   this.enableEdit = this.enableEdit.bind(this)
   this.completeEdit = this.completeEdit.bind(this)
 }

 handleChange = (event) => {
   this.setState({
     value: event.target.value,
   })
 }

 enableEdit() {
   this.setState({
     editable: true
   })
 }

 completeEdit() {
   this.setState({
     editable: false
   })
 }

  render() {
    const {
      notes,
      note,
      deleteNote,
      deleteNoteTodo,
      toggleNoteTodo,
      onCompleteClick,
      textChanged
    } = this.props
    const { editable } = this.state
    // console.log(note)
    // console.log(note.noteTodos)
    return (
      <div style={noteItem}>
        <span className={styles.noteTitle}>{note.title}</span>
        <IconButton
          iconClassName='material-icons'
          iconStyle={iconStyle}
          onClick={() => (deleteNote(note.id))}
          style={{
            display: 'flex',
            width: '0.8rem',
            height: '1.5rem',
            padding: 0,
            margin: '-0.7rem 0'
          }}
        >
          clear
        </IconButton>
        <div className={styles.noteTextBlock}>
          <span className={styles.noteText}
            onClick={this.enableEdit}
            style={!note.todos && !editable ? {display: 'inline-block'} :
              note.text && !editable ? {display: 'inline-block'} : {display: 'none'}}
          >
            {this.state.value}
          </span>
          <textarea
            className={styles.noteText}
            name='noteTextarea'
            style={editable ? {display: 'flex'} : {display: 'none'}}
            onChange={this.handleChange}
            defaultValue={this.state.value}
          />
          <IconButton
            iconClassName='material-icons'
            iconStyle={iconStyle}
            tooltip='Done'
            tooltipStyles={{margin: '-2.5rem 0 0 0.7rem'}}
            onClick={() => {
              onCompleteClick(note.id, this.state.value),
              this.completeEdit
            }}
            style={{
              display: !editable ? 'none': 'flex',
              width: '0.8rem',
              height: '1.5rem',
              padding: 0,
              margin: '0.3rem 0 0'
            }}
          >
            done
          </IconButton>
        </div>
        <div className={styles.todoList}>
          <NoteList noteTodos={note.noteTodos}
            toggleNoteTodo={toggleNoteTodo}
            deleteNoteTodo={deleteNoteTodo}
            noteId={note.id}
          />
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Note)

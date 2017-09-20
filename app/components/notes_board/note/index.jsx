import React from 'react'
import styles from './note.scss'
import { connect } from 'react-redux'
import { deleteNote } from 'core/actions'
import {List, ListItem} from 'material-ui/List'
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id))
  }
}

class Note extends React.Component {

  makeList() {
    if (this.props.note.todos) {
      return this.props.note.todos.map(todo => {
        return (
          <ListItem style={itemStyles} key={todo.id}
            primaryText={todo.text}
            innerDivStyle={{wordBreak: 'break-word', padding: '0.5rem'}}
          />
        )
      })
    }
    return ''
  }

  render() {
    const { note, deleteNote } = this.props
    console.log(note.todos)
    return (
      <div className={styles.noteItem}>
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
          {this.makeList()}
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps) (Note)

import React from 'react'
import styles from './note.scss'
import {List, ListItem} from 'material-ui/List'

const itemStyles = {
  backgroundColor: '#fff',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  margin: '0.25rem 0',
  padding: '0 0.5rem',

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
    const { note } = this.props
    console.log(note.todos)
    return (
      <div>
        <div className={styles.noteItem}>
          <span className={styles.noteTitle}>{note.title}</span>
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
      </div>
    )
  }
}

export default Note

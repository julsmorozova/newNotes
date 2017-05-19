import React from 'react'
import styles from './note.scss'
import TodoList from 'components/todo_list'

class Note extends React.Component {

  render() {
    const { note } = this.props
    return (
      <div>
        <div className={styles.noteItem}>
          <span className={styles.noteTitle}>{note.title}</span>
          <span className={styles.noteText}>{note.text}</span>
          <TodoList todos={note.todos} />
        </div>
      </div>
    )
  }
}

export default Note

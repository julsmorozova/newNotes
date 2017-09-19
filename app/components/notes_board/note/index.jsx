import React from 'react'
import styles from './note.scss'
import TodoList from 'components/todo_list'
import { toggleNoteTodo, deleteNoteTodo } from 'core/actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNoteTodo: (id) => dispatch(toggleNoteTodo(id)),
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id))
  }
}

class Note extends React.Component {

  render() {
    const { note } = this.props
    console.log(note.todos)
    return (
      <div>
        <div className={styles.noteItem}>
          <span className={styles.noteTitle}>{note.title}</span>
          <span className={styles.noteText}>{note.text}</span>
          <TodoList todos={note.todos} toggleTodo={this.props.toggleNoteTodo} deleteTodo={this.props.deleteNoteTodo} />
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Note)

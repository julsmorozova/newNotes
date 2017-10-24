import React from 'react'
import Todo from 'components/todo'
import styles from './todo_list.scss'

class TodoList extends React.Component {
  makeTodos() {
    if (this.props.todos) {
      return this.props.todos.map(todo => {
        if (todo.noteId === undefined) {
          return (
            <Todo key={todo.id} todo={todo} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
          )
        }
        return null
      })
    }
    return ''
  }

  render() {
    return (
      <div className={styles.todoList}>
        {this.makeTodos()}
      </div>
    )
  }
}

export default TodoList

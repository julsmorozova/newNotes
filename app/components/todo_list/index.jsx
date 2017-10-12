import React from 'react'
import Todo from 'components/todo'
import styles from './todo_list.scss'

class TodoList extends React.Component {

  makeTodos() {
    if (this.props.todos) {
      return this.props.todos.map(todo => {
        return (
          <Todo key={todo.text} todo={todo} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
        )
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

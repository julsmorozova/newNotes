import React from 'react'
import { connect } from 'react-redux'
import Todo from 'components/todo'
import styles from './todo_list.scss'

class TodoList extends React.Component {

  makeTodos() {
    if (this.props.todos) {
      return this.props.todos.map(todo => {
        return (
          <Todo key={todo.id} todo={todo} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
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

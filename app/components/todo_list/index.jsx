import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo } from 'core/actions'
import Todo from 'components/todo'
import styles from './todo_list.scss'

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => dispatch(deleteTodo(id))
  }
}


class TodoList extends React.Component {

  makeTodos() {
    return this.props.todos.map(todo => {
      return (
        <Todo key={todo.id} todo={todo} deleteTodo={this.props.deleteTodo} />
      )
    })
  }

  render() {
    return (
      <div className={styles.todoList}>
        {this.makeTodos()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

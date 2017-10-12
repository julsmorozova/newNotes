import React from 'react'
// import { connect } from 'react-redux'
// import { toggleTodo, deleteTodo } from 'core/actions'
import IconButton from 'material-ui/IconButton'
import styles from './todo.scss'

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleTodo: (id) => dispatch(toggleTodo(id)),
//     deleteTodo: (id) => dispatch(deleteTodo(id))
//   }
// }

const iconStyle = {
  color: '#777',
  fontSize: '1rem'
}

class Todo extends React.Component {
  render() {
    const { todo, toggleTodo, completed, deleteTodo } = this.props
    return (
      <div className={styles.todoItem}>
        <a onClick={() => (toggleTodo(todo.id))}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            wordWrap: 'break-word',
            width: '90%'
          }}
        >
          {todo.text}
        </a>
        <IconButton
          iconClassName='material-icons'
          iconStyle={iconStyle}
          onClick={() => (deleteTodo(todo.id))}
        >
          clear
        </IconButton>
      </div>
    )
  }
}

export default Todo

import React from 'react'
import ActionButton from 'components/action_btn'
import styles from './todo.scss'

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
        <ActionButton
          icon='clear'
          iconColor='#777'
          iconSize='1rem'
          action={() => (deleteTodo(todo.id))}
        />
      </div>
    )
  }
}

export default Todo

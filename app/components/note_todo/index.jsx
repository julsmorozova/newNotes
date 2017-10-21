import React from 'react'
import { connect } from 'react-redux'
import { deleteNoteTodo, toggleNoteTodo } from 'core/actions'
import ActionButton from 'components/action_btn'
import styles from './note_todo.scss'

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNoteTodo: (id) => dispatch(toggleNoteTodo(id)),
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id))
  }
}

const iconStyle = {
  color: '#777',
  fontSize: '1rem'
}

class NoteTodo extends React.Component {
  render() {
    const { noteTodo, toggleNoteTodo, completed, deleteNoteTodo } = this.props
    return (
      <div className={styles.todoItem}>
        <a
          onClick={() => (toggleNoteTodo(noteTodo.id))}
          style={{
            textDecoration: noteTodo.completed ? 'line-through' : 'none',
            wordWrap: 'break-word',
            width: '90%'
          }}
        >
          {noteTodo.text}
        </a>
        <ActionButton
          icon='clear'
          iconColor='#777'
          iconSize='1rem'
          action={() => (deleteNoteTodo(noteTodo.id))}
        />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(NoteTodo)

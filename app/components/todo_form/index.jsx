import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from 'core/actions'
import IconButton from 'material-ui/IconButton'
import styles from './todo_form.scss'

let task = ''

const mapStateToProps = (state) => {
  return {
    todoFormOpen: state.view.todoFormOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => dispatch(addTodo(text))
  }
}

class TodoForm extends React.Component {

  render() {
    const { todoFormOpen, addTodo } = this.props
    return (
      <div
        className={styles.inputContainer}
        style={{
          display: todoFormOpen ? 'flex' : 'none',
        }}
      >
        <input
          className={styles.todoInput}
          ref={node => {task = node}}
          placeholder='Add todo item...'
        />
        <IconButton
          iconClassName='material-icons'
          iconStyle={{color: '#777'}}
          onClick={() => {
            addTodo(task.value)
            task.value = ''
          }}
        >
          done
        </IconButton>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)

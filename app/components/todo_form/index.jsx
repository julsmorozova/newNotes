import React from 'react'
import { connect } from 'react-redux'
import ActionButton from 'components/action_btn'
import styles from './todo_form.scss'

let task = ''

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  clearInput = (event) => {
    this.setState({
      value: ''
    })
  }

  handleFocus = (event) => {
    event.target.parentElement.style.borderBottom = '0.125rem solid #00BCD4'
  }

  handleBlur = (event) => {
    event.target.parentElement.style.borderBottom = '0.0625rem solid #e0e0e0'
  }

  render() {
    const { todoFormOpen, action, action2, noteId } = this.props
    const { value } = this.state
    return (
      <div
        className={styles.inputContainer}
        style={{
          display: todoFormOpen ? 'flex' : 'none'
        }}
      >
        <input
          className={styles.todoInput}
          placeholder='Add todo item...'
          value={value}
          onChange={this.handleChange}
          onClick={this.clearInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <ActionButton
          icon='done'
          iconColor='#777'
          iconSize='1.5rem'
          tooltipName='Add item'
          tooltipVisible
          action={() => {
            action2 ? action2(noteId, this.state.value) : action(this.state.value)
          }}
        />
      </div>
    )
  }
}

export default TodoForm

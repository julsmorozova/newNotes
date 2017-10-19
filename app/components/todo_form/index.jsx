import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
// import TextField from 'material-ui/TextField'
import styles from './todo_form.scss'

let task = ''

// const hintStyle = {
//
// }
//
// const inputStyle= {
//
// }

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
        <IconButton
          type='reset'
          iconClassName='material-icons'
          iconStyle={{color: '#777'}}
          tooltip='Add item'
          tooltipStyles={{marginTop: '-0.7rem'}}
          onClick={() => {
            action2 ? action2(noteId, this.state.value) : action(this.state.value)
          }}
        >
          done
        </IconButton>
      </div>
    )
  }
}

export default TodoForm

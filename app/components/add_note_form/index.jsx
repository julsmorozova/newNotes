import React from 'react'
import styles from './textarea.scss'
import Paper from 'material-ui/Paper'
import classnames from 'classnames'
import { addNote, toggleTodo, deleteTodo, addTodo } from 'core/actions'
import { connect } from 'react-redux'
import TodoForm from 'components/todo_form'
import TodoList from 'components/todo_list'
import ActionButton from 'components/action_btn'

const DEFAULT_HEIGHT = 20

const noteStyle = {
  width: '18.75rem',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: '0.5rem',
  margin: '0 1rem 1rem 0',
  transition: 'none'
}

let anchor = ''
let input = ''

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    listView: state.view.listView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: (title, text, todos) => dispatch(addNote(title, text, todos)),
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    addTodo: (text) => dispatch(addTodo(text))
  }
}

class AddNoteForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      height: DEFAULT_HEIGHT,
      todoFormOpen: false
    }
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this)
  }

  componentDidMount() {
    this.mounted = true

    this.setFilledTextareaHeight()
  }

  openTodoForm = (event) => {
    this.setState({
      todoFormOpen: true
    })
  }

  hideTodoForm = (event) => {
    this.setState({
      todoFormOpen: false
    })
  }


  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost

      this.setState({
        height: element.clientHeight
      })
    }
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT
    const { height } = this.state
    return (
      <div>
        <textarea
          className={styles.textarea}
          name='textarea'
          id='textarea'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          defaultValue={''}
          style={{
            height,
            resize: isOneLine ? 'none' : null
          }}
          ref={node => {anchor = node}}
          onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    )
  }

  getGhostField() {
    const ghostTextareaStyles = classnames(styles.textarea, styles.ghost)
    return (
      <div
        className={ghostTextareaStyles}
        ref={(c) => this.ghost = c}
        aria-hidden='true'
      >
        {anchor.value}
      </div>
    )
  }

  handleFocus = (event) => {
    event.target.style.borderBottom = '0.125rem solid #00BCD4'
  }

  handleBlur = (event) => {
    event.target.style.borderBottom = '0.0625rem solid #e0e0e0'
  }

  render() {
    const { onAddClick, todos, listView } = this.props
    const { todoFormOpen } = this.state
    return (
      <div>
        <Paper style={listView ? {...noteStyle, width: '30rem'} : noteStyle} zDepth={1}>
          <input
            className={styles.titleInput}
            ref={node => {input = node}}
            placeholder='Add title...'
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <div
            style={{
              display: 'block',
              position: 'relative'
            }}
          >
            {this.getExpandableField()}
            {this.getGhostField()}
          </div>
          <TodoForm todoFormOpen={todoFormOpen} action={this.props.addTodo} />
          <TodoList todos={todos} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
          <div className={styles.footer}>
            <ActionButton
              iconColor='#777'
              iconSize='1.5rem'
              icon='list'
              tooltipVisible
              tooltipName='Add list'
              tooltipTop='130%'
              action={this.openTodoForm}
            />
            <ActionButton
              iconColor='#777'
              iconSize='1.5rem'
              icon='done'
              tooltipVisible
              tooltipName='Save note'
              tooltipTop='130%'
              action={() => {
                onAddClick(input.value || '', anchor.value || '', todos)
                input.value = ''
                anchor.value = ''
                this.hideTodoForm
              }}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteForm)

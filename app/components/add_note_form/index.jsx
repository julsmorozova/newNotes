import React from 'react'
import styles from './textarea.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import classnames from 'classnames'
import { addNote, toggleTodo, deleteTodo, addTodo } from 'core/actions'
import { connect } from 'react-redux'
import TodoForm from 'components/todo_form'
import TodoList from 'components/todo_list'

const DEFAULT_HEIGHT = 20

const noteStyle = {
  width: 300,
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: '0.5rem',
  margin: '0 1rem 1rem 0'
}

let anchor = ''
let input = ''

const mapStateToProps = (state) => {
  return {
    todos: state.todos
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
    const { onAddClick, todos } = this.props
    const { todoFormOpen } = this.state
    return (
      <div>
        <Paper style={noteStyle} zDepth={1}>
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
            <IconButton
              tooltip='Add list'
              tooltipStyles={{marginTop: '-0.7rem'}}
              style={{display: 'flex', width: '2rem', height: '1.5rem', padding: 0, margin: '0 0.3rem'}}
              iconClassName='material-icons'
              iconStyle={{color: '#777', padding: '0 0.3rem'}}
              onClick={this.openTodoForm}
            >
              list
            </IconButton>
            <IconButton
              style={{height: '2rem', padding: '0 0.3rem', margin: '0 0.3rem'}}
              iconClassName='material-icons'
              iconStyle={{color: '#777', padding: 0}}
              tooltip='Save note'
              tooltipStyles={{marginTop: '-0.7rem'}}
              onClick={() => {
                onAddClick(input.value || '', anchor.value || '', todos)
                input.value = ''
                anchor.value = ''
                this.hideTodoForm
              }}
            >
              done
            </IconButton>
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddNoteForm)

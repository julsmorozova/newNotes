import React from 'react'
import styles from './textarea.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import classnames from 'classnames'
import { addNote, openTodoForm } from 'core/actions'
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
    noteFormOpen : state.view.noteFormOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: (title, text, todos) => dispatch(addNote(title, text, todos)),
    openTodoForm: () => dispatch(openTodoForm())
  }
}

class AddNoteForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      height: DEFAULT_HEIGHT
    }
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this)
  }

  componentDidMount() {
    this.mounted = true

    this.setFilledTextareaHeight()
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
          autoFocus={true}
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

  render() {
    const {onAddClick, openTodoForm, noteFormOpen} = this.props
    return (
      <div>
        <Paper style={noteStyle} zDepth={1}>
          <input
            className={styles.titleInput}
            ref={node => {input = node}}
            placeholder='Add title...'
          />
          <div
            style={{
              display: noteFormOpen ? 'block' : 'none',
              position: 'relative'
            }}
          >
            {this.getExpandableField()}
            {this.getGhostField()}
          </div>
          <TodoForm />
          <TodoList />
          <div className={styles.footer}>Action buttons go here
            <IconButton
              iconClassName='material-icons'
              iconStyle={{color: '#777'}}
              onClick={() => {
                onAddClick(input.value || 'No title', anchor.value)
                input.value = ''
                anchor.value = ''
              }}
            >
              done
            </IconButton>
            <IconButton
              style={{display: noteFormOpen ? 'flex' : 'none'}}
              iconClassName='material-icons'
              iconStyle={{color: '#777'}}
              onClick={openTodoForm}
            >
              list
            </IconButton>
          </div>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddNoteForm)

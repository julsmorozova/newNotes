import React from 'react'
import styles from './note.scss'
import {
  deleteNote,
  deleteNoteTodo,
  toggleNoteTodo,
  editNoteText,
  addNoteTodo
} from 'core/actions'
import { connect } from 'react-redux'
import NoteList from 'components/note_list'
import ActionButton from 'components/action_btn'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import TodoForm from 'components/todo_form'
import ColorButton from 'components/color_btn'

const iconStyle = {
  color: '#777',
  fontSize: '1rem'
}

const noteItem = {
  backgroundColor: '#eee',
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  padding: '1rem 0.8rem',
  width: '18.75rem',
  margin: '0 1rem 1rem 0',
  boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  borderRadius: '0.125rem'
}

const mapStateToProps = (state) => {
  return {
    listView: state.view.listView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id)),
    toggleNoteTodo: (id) => dispatch(toggleNoteTodo(id)),
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id)),
    onCompleteClick: (id, text) => dispatch(editNoteText(id, text)),
    addNoteTodo: (noteId, text) => dispatch(addNoteTodo(noteId, text))
  }
}

const colorMatch = [
  ['#e57373', '#ffebee'],
  ['#ffab91', '#fbe9e7'],
  ['#fff59d', '#fffde7'],
  ['#a5d6a7', '#e8f5e9'],
  ['#80cbc4', '#e0f2f1'],
  ['#90caf9', '#e3f2fd'],
  ['#b39ddb', '#ede7f6'],
  ['#bcaaa4', '#efebe9'],
  ['##e3f2fd', '#fff']
]

const colorMap = new Map(colorMatch)

class Note extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     value: props.note.text,
     editable: false,
     newListShown: false
   }
   this.enableEdit = this.enableEdit.bind(this)
   this.completeEdit = this.completeEdit.bind(this)
 }

 handleChange = (event) => {
   this.setState({
     value: event.target.value,
   })
 }

 enableEdit() {
   this.setState({
     editable: true
   })
 }

 completeEdit() {
   this.setState({
     editable: false
   })
 }

 showNewList = (event) => {
   this.setState({
     newListShown: true
   })
 }

 matchColors(color1) {
   return colorMap.get(color1)
 }

  render() {
    const {
      notes,
      note,
      deleteNote,
      deleteNoteTodo,
      toggleNoteTodo,
      onCompleteClick,
      textChanged,
      addTodo
    } = this.props
    const { editable, newListShown } = this.state
    return (
      <div>
        <Paper style={this.props.listView ?
          {...noteItem, width: '30rem', backgroundColor: note.color} :
            {...noteItem, backgroundColor: note.color}} zDepth={1}
        >
          <span className={styles.noteTitle}>{note.title}</span>
          <div className={styles.noteTextBlock}>
            <span className={styles.noteText}
              onClick={this.enableEdit}
              style={!note.todos && !editable ? {display: 'inline-block', backgroundColor: this.matchColors(note.color)} :
                note.text && !editable ? {display: 'inline-block', backgroundColor: this.matchColors(note.color)} :
                {display: 'none'}}
            >
              {this.state.value}
            </span>
            <textarea
              className={styles.noteText}
              name='noteTextarea'
              style={editable ? {display: 'flex'} : {display: 'none'}}
              onChange={this.handleChange}
              defaultValue={this.state.value}
            />
            { editable ?
              <div className={styles.buttonsBlock}>
                <ActionButton
                  icon='done'
                  iconColor='#777'
                  iconSize='1.2rem'
                  tooltipVisible
                  tooltipName='Done'
                  action={() => {
                    onCompleteClick(note.id, this.state.value),
                    this.completeEdit
                  }}
                />
                <ActionButton
                  icon='add'
                  iconColor='#777'
                  iconSize='1.2rem'
                  tooltipVisible
                  tooltipName='Add todo list'
                  tooltipRight='-90%'
                  action={this.showNewList}
                />
                <ColorButton noteId={note.id} />
                <ActionButton
                  icon='delete'
                  iconColor='#777'
                  iconSize='1.2rem'
                  tooltipVisible
                  tooltipName='Delete note'
                  tooltipRight='-90%'
                  action={() => (deleteNote(note.id))}
                />
              </div>
              : '' }
          </div>
          <div className={styles.todoList}>
            <NoteList noteTodos={note.noteTodos}
              toggleNoteTodo={toggleNoteTodo}
              deleteNoteTodo={deleteNoteTodo}
              noteId={note.id}
            />
          </div>
          <TodoForm todoFormOpen={newListShown} action2={this.props.addNoteTodo} noteId={note.id} />
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)

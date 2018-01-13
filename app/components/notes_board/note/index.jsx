import React from 'react'
import styles from './note.scss'
import {
  deleteNote,
  deleteNoteTodo,
  toggleNoteTodo,
  editNoteText,
  addNoteTodo,
  openConfirmingDialog,
  copyNote,
  addDefaultTodos,
  deleteTodoList,
  editNoteTitle
} from 'core/actions'
import { connect } from 'react-redux'
import NoteList from 'components/note_list'
import ActionButton from 'components/action_btn'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import TodoForm from 'components/todo_form'
import ColorButton from 'components/color_btn'
import ConfirmingDialog from 'components/confirming_dialog'
import AddListButton from 'components/add_list_button'

const iconStyle = {
  color: '#777',
  fontSize: '1rem'
}

const noteItem = {
  backgroundColor: '#eee',
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  padding: '1rem 0.8rem 0.4rem',
  width: '18.75rem',
  margin: '0 1rem 1rem 0',
  boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  borderRadius: '0.125rem'
}

const mapStateToProps = (state) => {
  return {
    listView: state.view.listView,
    confirmingDialogOpen: state.view.confirmingDialogOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id)),
    toggleNoteTodo: (id) => dispatch(toggleNoteTodo(id)),
    deleteNoteTodo: (id) => dispatch(deleteNoteTodo(id)),
    onCompleteClick: (id, text) => dispatch(editNoteText(id, text)),
    addNoteTodo: (noteId, text) => dispatch(addNoteTodo(noteId, text)),
    openConfirmingDialog: () => dispatch(openConfirmingDialog()),
    copyNote: (copiedNoteId) => dispatch(copyNote(copiedNoteId)),
    addDefaultTodos: (noteId, todos) => dispatch(addDefaultTodos(noteId, todos)),
    deleteTodoList: (noteId) => dispatch(deleteTodoList(noteId)),
    editNoteTitle: (id, title) => dispatch(editNoteTitle(id, title))
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

const defaultList = [
  'apples',
  'bananas',
  'cherry tomatoes',
  'avocado 2pcs',
  'salmon 1kg',
  'feta cheese 200g 2pcs',
  'plain yogurt',
  'bread for toasting',
  'granola'
]

class Note extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     textValue: props.note.text,
     titleValue: props.note.title,
     editable: false,
     newListShown: false
   }
   this.enableEdit = this.enableEdit.bind(this)
   this.completeEdit = this.completeEdit.bind(this)
 }

 handleTextChange = (event) => {
   this.setState({
     textValue: event.target.value
   })
 }

 handleTitleChange = (event) => {
   this.setState({
     titleValue: event.target.value
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

 trimLongName(name) {
   let max = 23;
   return (name.length > max) ? name.substr(0, max).concat('...') : name
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
      addTodo,
      openConfirmingDialog,
      confirmingDialogOpen,
      copyNote,
      addDefaultTodos,
      deleteTodoList,
      editNoteTitle
    } = this.props
    const { editable, newListShown } = this.state
    return (
      <div>
        <Paper style={this.props.listView ?
          {...noteItem, width: '30rem', backgroundColor: note.color} :
            {...noteItem, backgroundColor: note.color}} zDepth={1}
        >
          <div className={styles.titleBlock}
            style={editable ? {backgroundColor: '#fff', padding: '0 0.2rem'} :
            {backgroundColor: 'inherit', padding: '0'}}
          >
            <span className={styles.noteTitle}
              onClick={this.enableEdit}
              style={editable ? {display: 'none'} : {display: 'block'}}
            >
              {this.trimLongName(this.state.titleValue)}
            </span>
            <input
              name='noteTitleInput'
              className={styles.noteTitle}
              style={editable ? {display: 'block'} : {display: 'none'}}
              onChange={this.handleTitleChange}
              defaultValue={this.state.titleValue}
            />
            <ActionButton
              icon='more_horiz'
              customMargin='0 0.2rem 0 0'
              tooltipVisible
              tooltipName='Show options'
              tooltipRight='-90%'
              tooltipTop='130%'
              action={this.state.editable ? this.completeEdit : this.enableEdit}
            />
          </div>
          <div className={styles.noteTextBlock}>
            <span className={styles.noteText}
              onClick={this.enableEdit}
              style={!note.todos && !editable ? {display: 'inline-block', backgroundColor: this.matchColors(note.color)} :
                note.text && !editable ? {display: 'inline-block', backgroundColor: this.matchColors(note.color)} :
                {display: 'none'}}
            >
              {this.state.textValue}
            </span>
            <textarea
              className={styles.noteText}
              name='noteTextarea'
              style={editable ? {display: 'flex'} : {display: 'none'}}
              onChange={this.handleTextChange}
              defaultValue={this.state.textValue}
            />
          </div>
          <TodoForm todoFormOpen={newListShown || editable} action2={this.props.addNoteTodo} noteId={note.id} />
          <div className={styles.todoList}>
            <NoteList noteTodos={note.noteTodos}
              toggleNoteTodo={toggleNoteTodo}
              deleteNoteTodo={deleteNoteTodo}
              noteId={note.id}
            />
          </div>
          { editable ?
            <div className={styles.buttonsBlock} style={{backgroundColor: this.matchColors(note.color)}}>
              <ActionButton
                icon='done'
                tooltipVisible
                tooltipName='Done'
                tooltipTop='130%'
                action={() => {
                  onCompleteClick(note.id, this.state.textValue),
                  editNoteTitle(note.id, this.state.titleValue),
                  this.completeEdit
                }}
              />
              <AddListButton action1={() => {addDefaultTodos(note.id, defaultList)}}
                action2={() => {deleteTodoList(note.id)}}
              />
              <ColorButton noteId={note.id} />
              <ActionButton
                icon='content_copy'
                iconSize='1.4rem'
                tooltipVisible
                tooltipName='Copy this note'
                tooltipRight='-90%'
                tooltipTop='140%'
                action={() => {copyNote(note.id)}}
              />
              <ActionButton
                icon='delete'
                iconSize='1.4rem'
                tooltipVisible
                tooltipName='Delete note'
                tooltipRight='-90%'
                tooltipTop='140%'
                action={openConfirmingDialog}
              />
              <ConfirmingDialog confirmingDialogOpen={confirmingDialogOpen} action={deleteNote} noteId={note.id} />
            </div>
            : '' }
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)

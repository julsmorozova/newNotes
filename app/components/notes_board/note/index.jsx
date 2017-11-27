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
  addDefaultTodos
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
    addDefaultTodos: (noteId, todos) => dispatch(addDefaultTodos(noteId, todos))
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
      addTodo,
      openConfirmingDialog,
      confirmingDialogOpen,
      copyNote,
      addDefaultTodos
    } = this.props
    const { editable, newListShown } = this.state
    return (
      <div>
        <Paper style={this.props.listView ?
          {...noteItem, width: '30rem', backgroundColor: note.color} :
            {...noteItem, backgroundColor: note.color}} zDepth={1}
        >
          <div className={styles.titleBlock}>
            <span className={styles.noteTitle}>{note.title}</span>
            <ActionButton
              icon='more_horiz'
              iconColor='#777'
              iconSize='1.5rem'
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
              {this.state.value}
            </span>
            <textarea
              className={styles.noteText}
              name='noteTextarea'
              style={editable ? {display: 'flex'} : {display: 'none'}}
              onChange={this.handleChange}
              defaultValue={this.state.value}
            />
          </div>
          <TodoForm todoFormOpen={newListShown} action2={this.props.addNoteTodo} noteId={note.id} />
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
                iconColor='#777'
                iconSize='1.5rem'
                tooltipVisible
                tooltipName='Done'
                tooltipTop='130%'
                action={() => {
                  onCompleteClick(note.id, this.state.value),
                  this.completeEdit
                }}
              />
              <AddListButton action1={() => {addDefaultTodos(note.id, defaultList)}} action2={this.showNewList} />
              <ColorButton noteId={note.id} />
              <ActionButton
                icon='content_copy'
                iconColor='#777'
                iconSize='1.4rem'
                tooltipVisible
                tooltipName='Copy this note'
                tooltipRight='-90%'
                tooltipTop='140%'
                action={() => {copyNote(note.id)}}
              />
              <ActionButton
                icon='delete'
                iconColor='#777'
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

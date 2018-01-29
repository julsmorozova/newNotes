import React from 'react'
import styles from '../note/note.scss'
import {
  deleteNote,
  deleteForever,
  restoreNote,
  openConfirmingDialog
} from 'core/actions'
import { connect } from 'react-redux'
import NoteList from 'components/note_list'
import ActionButton from 'components/action_btn'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ConfirmingDialog from 'components/confirming_dialog'

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
    deleteForever: (id) => dispatch(deleteForever(id)),
    openConfirmingDialog: () => dispatch(openConfirmingDialog()),
    restoreNote: (id) => dispatch(restoreNote(id))
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

class NoteDeleted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonsShown: false
    }
    this.showButtons = this.showButtons.bind(this)
    this.hideButtons = this.hideButtons.bind(this)
  }

  showButtons() {
    this.setState({
      buttonsShown: true
    })
  }

  hideButtons() {
    this.setState({
      buttonsShown: false
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
      deleteForever,
      restoreNote,
      openConfirmingDialog,
      confirmingDialogOpen
    } = this.props
    return (
      <div>
        <Paper style={this.props.listView ?
          {...noteItem, width: '30rem', backgroundColor: note.color} :
            {...noteItem, backgroundColor: note.color}} zDepth={1}
        >
          <div className={styles.titleBlock}
            style={{backgroundColor: 'inherit', padding: '0'}}
          >
            <span className={styles.noteTitle}
              onClick={this.enableEdit}
              style={{display: 'block'}}
            >
              {this.trimLongName(note.title)}
            </span>
            <ActionButton
              icon='more_horiz'
              customMargin='0 0.2rem 0 0'
              tooltipVisible
              tooltipName='Show options'
              tooltipRight='-90%'
              tooltipTop='130%'
              action={this.state.buttonsShown ? this.hideButtons : this.showButtons}
            />
          </div>
          <div className={styles.noteTextBlock}>
            <span className={styles.noteText}
              style={{display: 'inline-block', backgroundColor: this.matchColors(note.color)}}
            >
              {note.text}
            </span>
          </div>
          <div className={styles.todoList}>
            <NoteList noteTodos={note.noteTodos}
              noteId={note.id}
            />
          </div>
          { this.state.buttonsShown ? //check if note is in editable mode
            <div className={styles.buttonsBlock} style={this.state.buttonsShown ?
              {display: 'inline-block', backgroundColor: this.matchColors(note.color)} :
              {display: none}}
            >
              <ActionButton
                icon='restore'
                iconSize='1.4rem'
                tooltipVisible
                tooltipName='Restore'
                tooltipRight='-90%'
                tooltipTop='140%'
                action={() => {restoreNote(note.id)}}
              />
              <ActionButton
                icon='delete'
                iconSize='1.4rem'
                tooltipVisible
                tooltipName='Delete forever'
                tooltipRight='-90%'
                tooltipTop='140%'
                action={openConfirmingDialog}
              />
              <ConfirmingDialog confirmingDialogOpen={confirmingDialogOpen} action={deleteForever} noteId={note.id} />
            </div>
            : '' }
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDeleted)

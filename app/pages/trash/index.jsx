import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import styles from './trash.scss'
import Settings from '../../components/settings'
import NoteDeleted from '../../components/notes_board/note_deleted'

const mapStateToProps = (state) => {
  return {
    deleted: state.notesState.deleted,
    listView: state.view.listView,
  }
}

const trashBoardStyles = {
  width: '80%',
  margin: '1rem auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start'
}

class TrashPage extends React.Component {
  makeNote() {
    if (this.props.deleted) {
      return this.props.deleted.map(note => {
        return (
          <NoteDeleted key={note.id + Math.random()} note={note} />
        )
      })
    }
    return ''
  }

  render() {
    console.log(this.props.deleted)
    return (
      <div className={styles.content}>
        <h3>Notes you deleted</h3>
        <div style={this.props.listView ?
          {...trashBoardStyles,
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            width: '65%'} :
          trashBoardStyles}
        >
          {this.makeNote()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(TrashPage)

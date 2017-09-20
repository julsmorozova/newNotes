import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import styles from './dashboard.scss'
import Settings from '../../components/settings'
import NotesBoard from '../../components/notes_board'
import { deleteNote } from 'core/actions'

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id))
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <Settings />
        <NotesBoard notes={this.props.notes} deleteNote={this.props.deleteNote} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

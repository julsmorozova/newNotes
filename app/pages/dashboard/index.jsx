import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import styles from './dashboard.scss'
import Settings from '../../components/settings'
import NotesBoard from '../../components/notes_board'

const mapStateToProps = (state) => {
  return {
    notes: state.notesState.notes
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <NotesBoard notes={this.props.notes} />
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Dashboard)

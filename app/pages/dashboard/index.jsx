import React from 'react'
import Header from '../../components/header'
import styles from './dashboard.scss'
import Settings from '../../components/settings'
import NotesBoard from '../../components/notes_board'

class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <Settings />
        <NotesBoard />
      </div>
    )
  }
}

export default Dashboard

import React from 'react'
import styles from './note.scss'

class Note extends React.Component {

  render() {
    const { note } = this.props
    return (
      <div>
        <p className={styles.noteItem}>
          <span className={styles.noteTitle}>{note.title}</span>
          <span className={styles.noteText}>{note.text}</span>
        </p>
      </div>
    )
  }
}

export default Note

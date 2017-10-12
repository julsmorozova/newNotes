import React from 'react'
import NoteTodo from 'components/note_todo'
import styles from './note_list.scss'

class NoteList extends React.Component {

  makeTodos() {
    if (this.props.noteTodos) {
      return this.props.noteTodos.map(noteTodo => {
        return (
          <NoteTodo key={noteTodo.text.substring(1, 7)+ Math.random()} noteTodo={noteTodo} toggleNoteTodo={this.props.toggleNoteTodo} deleteNoteTodo={this.props.deleteNoteTodo} />
        )
      })
    }
    return ''
  }

  render() {
    return (
      <div className={styles.noteList}>
        {this.makeTodos()}
      </div>
    )
  }
}

export default NoteList

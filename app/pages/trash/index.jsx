import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/header'
import styles from './trash.scss'
import Settings from '../../components/settings'

const mapStateToProps = (state) => {
  return {
    deleted: state.notesState.deleted
  }
}

class TrashPage extends React.Component {
  render() {
    console.log(this.props.deleted)
    return (
      <div className={styles.content}>
        <div>Trash Page</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(TrashPage)

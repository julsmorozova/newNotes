import React from 'react'
import Header from '../../components/header'
import styles from './main.scss'
import Settings from '../../components/settings'

class Main extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <Settings />
        {this.props.children}
      </div>
    )
  }
}

export default Main

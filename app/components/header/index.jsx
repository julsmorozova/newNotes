import React from 'react'
import AppBar from 'material-ui/AppBar'
import styles from './header.scss'
import Hamburger from './hamburger'
import Settings from '../../components/settings'
import { toggleSettings } from 'core/actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSettings: () => dispatch(toggleSettings())
  }
}

class Header extends React.Component {
  render() {
    const {toggleSettings} = this.props
    return (
      <div className={styles.headerWrapper}>
        <AppBar
          title='New notes'
          iconElementLeft={<Hamburger {...{toggleSettings}} />}
        />
      </div>
    )
  }
}
export default connect(null, mapDispatchToProps)(Header)

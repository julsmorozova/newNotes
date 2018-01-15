import React from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { toggleSettings } from 'core/actions'
import ActionButton from 'components/action_btn'
import IconButton from 'material-ui/IconButton'
import styles from './settings.scss'
import { Link } from 'react-router-dom'

const iconStyle= {
  lineHeight: '1.3rem'
}

const btnStyle = {
  width: '1.3rem',
  padding: '0rem',
  margin: '0 0.5rem',
  height: '1.3rem'
}
const containerStyle = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
}

const mapStateToProps = (state) => {
  return {
    settingsOpened: state.header.settingsOpened
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSettings: () => dispatch(toggleSettings())
  }
}

class Settings extends React.Component {
  static defaultProps = {
    iconColor: '#777',
    iconSize: '1.5rem'
  }

  render() {
    const {settingsOpened, toggleSettings, iconColor, iconSize} = this.props
    return (
      <Drawer
        width={286}
        docked={false}
        open={settingsOpened}
        onRequestChange={toggleSettings}
        containerStyle={containerStyle}
      >
        <div className={styles.title}>
          Some Settings
          <ActionButton
            icon='clear'
            iconColor='#777'
            iconSize='1.5rem'
            action={toggleSettings}
          />
        </div>
        <div className={styles.menuItem}>
          <Link to='/trash' onClick={toggleSettings}>
            <IconButton
              style={btnStyle}
              iconClassName='material-icons'
              iconStyle={{...iconStyle, color: iconColor, fontSize: iconSize}}
            >
              delete
            </IconButton>
            <span className={styles.menuItemText}>Trash</span>
          </Link>
        </div>
        <div className={styles.menuItem}>
          <Link to='/' onClick={toggleSettings}>Dashboard</Link>
        </div>
      </Drawer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

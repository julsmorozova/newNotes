import React from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { toggleSettings } from 'core/actions'
import IconButton from 'material-ui/IconButton'

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
  render() {
    const {settingsOpened, toggleSettings} = this.props
    return (
      <Drawer
        width={286}
        docked={false}
        open={settingsOpened}
        onRequestChange={toggleSettings}
        containerStyle={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}
      >
        <div>
          <IconButton
            onClick={toggleSettings}
            style={{
              padding: '0px',
              marginRight: '-1.2rem'
            }}
            iconClassName='material-icons'
          >
            clear
          </IconButton>
        </div>
        Some Settings
      </Drawer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

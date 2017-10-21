import React from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import { toggleSettings } from 'core/actions'
import ActionButton from 'components/action_btn'

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
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0.5rem'}}>
          Some Settings
          <ActionButton
            icon='clear'
            iconColor='#777'
            iconSize='1.5rem'
            action={toggleSettings}
          />
        </div>
      </Drawer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

import React from 'react'
import ActionButton from 'components/action_btn'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const menuItem = {

}

class AddListButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  handleTouchTap = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      dropdownOpen: true
    })
  }

  handleRequestClose = (event) => {
    this.setState({
      dropdownOpen: false
    })
  }

  render() {
    const { action1, action2 } = this.props
    return (
      <div>
        <ActionButton
          icon='list'
          iconColor='#777'
          iconSize='1.5rem'
          tooltipVisible
          tooltipName='Add todo list'
          tooltipRight='-90%'
          tooltipTop='130%'
          action={this.handleTouchTap}
        />
        <Popover
          open={this.state.dropdownOpen}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem
              style={menuItem}
              onClick={action1}
              primaryText='Add default list'
            />
            <MenuItem
              style={menuItem}
              onClick={action2}
              primaryText='Add new list'
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default AddListButton

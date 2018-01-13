import React from 'react'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'components/tooltip'

const iconStyle= {
  lineHeight: '1.3rem'
}

const btnStyle = {
  width: '1.3rem',
  padding: '0rem',
  height: '1.3rem'
}

class ActionButton extends React.Component {

  static defaultProps = {
    iconColor: '#777',
    iconSize: '1.5rem',
    tooltipVisible: false,
    tooltipTop: '90%',
    tooltipRight: '0.5%'
  }

  constructor(props) {
    super(props)
    this.state = {
      hovered: false
    }
  }

  handleHover(isHovered) {
    this.setState({
      hovered: isHovered
    })
  }

  componentDidMount() {
    const { actionButton } = this.refs
    actionButton.addEventListener('mouseover', this.handleHover.bind(this, true))
    actionButton.addEventListener('mouseout', this.handleHover.bind(this, false))
  }

  componentWillUnmount() {
    const { actionButton } = this.refs
    actionButton.removeEventListener('mouseover', this.handleHover)
    actionButton.removeEventListener('mouseout', this.handleHover)
  }

  render() {
    const { icon, action, iconColor, iconSize, tooltipVisible, tooltipName, tooltipTop, tooltipRight, customMargin } = this.props
    return (
      <div ref='actionButton' style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
        <IconButton
          style={{...btnStyle, margin: customMargin || '0 1rem 0 0'}}
          iconClassName='material-icons'
          iconStyle={{...iconStyle, color: iconColor, fontSize: iconSize}}
          onClick={action}
        >
          {icon}
        </IconButton>
        {tooltipVisible ?
          <Tooltip
            name={tooltipName}
            shown={this.state.hovered ? 'flex' : 'none'}
            top={tooltipTop}
            right={tooltipRight}
          />
          : ''
        }
      </div>
    )
  }
}

export default ActionButton

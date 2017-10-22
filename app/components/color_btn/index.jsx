import React from 'react'
import ActionButton from 'components/action_btn'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { changeNoteColor } from 'core/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    changeNoteColor: (id, color) => dispatch(changeNoteColor(id, color))
  }
}

const paletteStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const colorCircleStyle = {
  display: 'flex',
  borderRadius: '50%',
  border: 'none',
  width: '1.3rem',
  height: '1.3rem',
  margin: '0 0.5rem 0.5rem 0'
}

const colors = [
  {name: 'red', colorCode: '#e57373'},
  {name: 'orange', colorCode: '#ffab91'},
  {name: 'yellow', colorCode: '#fff59d'},
  {name: 'green', colorCode: '#a5d6a7'},
  {name: 'teal', colorCode: '#80cbc4'},
  {name: 'blue', colorCode: '#90caf9'},
  {name: 'grey', colorCode: '#eee'}
]

class ColorButton extends React.Component {

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

  makeColorPalette(noteId, colors) {
    return colors.map(color => {
      return (
        <div key={color.name}
          style={{...colorCircleStyle, backgroundColor: color.colorCode}}
          onClick={() => this.props.changeNoteColor(noteId, color.colorCode)}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <ActionButton
          icon='brush'
          iconColor='#777'
          iconSize='1.2rem'
          tooltipVisible
          tooltipName='Change note color'
          tooltipRight='-90%'
          action={this.handleTouchTap}
        />
        <Popover
          open={this.state.dropdownOpen}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
        >
          <div style={paletteStyle}>
            {this.makeColorPalette(this.props.noteId, colors)}
          </div>
        </Popover>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ColorButton)
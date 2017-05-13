import React from 'react'
import IconButton from 'material-ui/IconButton'

const Hamburger = ({ toggleSettings }) => (
  <IconButton
    iconClassName='material-icons'
    iconStyle={{color: '#fff'}}
    onClick={toggleSettings}
    style={{padding: 0, marginLeft: '-0.3rem'}}
  >
    menu
  </IconButton>
)

export default Hamburger

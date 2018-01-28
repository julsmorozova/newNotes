import React from 'react'
import IconButton from 'material-ui/IconButton'

const Hamburger = ({ toggleSettings }) => (
  <IconButton
    iconClassName='material-icons'
    iconStyle={{color: '#fff', fontSize: '1.8rem'}}
    onClick={toggleSettings}
    style={{padding: '0 1rem', margin: '0 1rem 0 -0.3rem'}}
  >
    menu
  </IconButton>
)

export default Hamburger

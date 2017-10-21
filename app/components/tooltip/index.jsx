import React from 'react'

const defaultTooltipStyle = {
  position: 'absolute',
  padding: '0.2rem 0.5rem',
  lineHeight: 1.375,
  backgroundColor: 'rgba(95, 95, 95, 0.8)',
  color: '#fff',
  fontSize: '0.625rem',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  borderRadius: '0.125rem',
  zIndex: 10000
}

class Tooltip extends React.Component {
  render() {
    const { name, shown, top, right } = this.props
    return (
      <div style={{...defaultTooltipStyle, display: shown, top: top, right: right}}>
        {name}
      </div>
    )
  }
}

export default Tooltip

import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { closeConfirmingDialog } from 'core/actions'

const btnStyle = {
  margin: '0 0.5rem 0.5rem',
  padding: '0 0.5rem',
  whiteSpace: 'nowrap',
  minWidth: '2rem',
  height: '1.625rem',
  lineHeight: '1.625rem'
}

const labelStyle = {
  fontSize: '0.75rem',
  lineHeight: '1.5',
  padding: '0rem 0.325rem',
  color: '#777'
}

const dialogStyle = {
  maxWidth: '30rem'
}

const dialogBodyStyle = {
  padding: '3rem 2.5rem 1.4rem'
}

const mapStateToProps = (state) => {
  return {
    confirmingDialogOpen: state.view.confirmingDialogOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeConfirmingDialog: () => dispatch(closeConfirmingDialog())
  }
}

class ConfirmingDialog extends React.Component {
  render() {
    const { confirmingDialogOpen, closeConfirmingDialog } = this.props
    const actions = [
      <FlatButton
        label='Cancel'
        labelStyle={labelStyle}
        style={{ ...btnStyle, marginRight: 10 }}
        onTouchTap={() => {closeConfirmingDialog()}}
      />,
      <FlatButton
        label='Delete'
        labelStyle={{ ...labelStyle, color: '#fff' }}
        onTouchTap={() => {this.props.action(this.props.noteId), closeConfirmingDialog()}}
        style={btnStyle}
        backgroundColor={'#00BCD4'}
      />
    ]
    return (
      <div>
        <Dialog
          contentStyle={dialogStyle}
          bodyStyle={dialogBodyStyle}
          actions={actions}
          open={confirmingDialogOpen}
          onRequestClose={() => {closeConfirmingDialog()}}
        >
          <p>Are you sure you want to delete this note?</p>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmingDialog)

import React from 'react'
import AppBar from 'material-ui/AppBar'
import styles from './header.scss'
import Hamburger from './hamburger'
import Settings from 'components/settings'
import { toggleSettings, showListView, showGridView } from 'core/actions'
import { connect } from 'react-redux'
import ActionButton from 'components/action_btn'

const mapStateToProps = (state) => {
  return {
    listView: state.view.listView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSettings: () => dispatch(toggleSettings()),
    showListView: () => dispatch(showListView()),
    showGridView: () => dispatch(showGridView())
  }
}

class Header extends React.Component {
  render() {
    const { toggleSettings, showListView, showGridView, listView } = this.props
    return (
      <div className={styles.headerWrapper}>
        <AppBar
          title='New notes'
          iconElementLeft={<Hamburger {...{toggleSettings}} />}
        >
          <div className={styles.appbarContent}>
            {listView ?
              <ActionButton
                icon='view_quilt'
                iconSize='1.9rem'
                iconColor='#fff'
                tooltipVisible
                tooltipName='Grid view'
                action={showGridView}
              />
              :
              <ActionButton
                iconSize='1.9rem'
                icon='view_stream'
                iconColor='#fff'
                tooltipVisible
                tooltipName='List view'
                action={showListView}
              />
            }
          </div>
        </AppBar>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

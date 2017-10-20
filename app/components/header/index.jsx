import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import styles from './header.scss'
import Hamburger from './hamburger'
import Settings from '../../components/settings'
import { toggleSettings, showListView, showGridView } from 'core/actions'
import { connect } from 'react-redux'

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
              <IconButton
                type='reset'
                iconClassName='material-icons'
                iconStyle={{color: '#fff'}}
                tooltip='Grid view'
                tooltipStyles={{marginTop: '-0.7rem'}}
                onClick={showGridView}
              >
                view_quilt
              </IconButton>
              :
              <IconButton
                type='reset'
                iconClassName='material-icons'
                iconStyle={{color: '#fff'}}
                tooltip='List view'
                tooltipStyles={{marginTop: '-0.7rem'}}
                onClick={showListView}
              >
                view_stream
              </IconButton>
            }
          </div>
        </AppBar>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

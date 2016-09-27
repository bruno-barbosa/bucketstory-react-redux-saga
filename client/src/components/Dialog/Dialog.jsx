import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { Dialog } from 'react-mdl'

class DialogComponent extends React.Component {
  static propTypes = {
    open      : PropTypes.bool.isRequired,
    className : PropTypes.any.isRequired,
    children  : PropTypes.any.isRequired
  }

  componentDidMount () {
    const dialog = ReactDOM.findDOMNode(this)
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      window.dialogPolyfill.registerDialog(dialog)
    }
  }

  render () {
    require('./dialog.scss')

    return (
      <Dialog className={this.props.className} open={this.props.open} {...this.props}>
        {this.props.children}
      </Dialog>
    )
  }
}

export default DialogComponent

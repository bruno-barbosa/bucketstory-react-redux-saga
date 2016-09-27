import React, { PropTypes } from 'react'

const Spinner = (props) => {
  require('./spinner.scss')
  const Loader = require(`halogen/${props.type}`)

  return (
    <div className='spinner-container'>
      <Loader color={props.color} size={props.size} />
    </div>
  )
}

Spinner.defaultProps = {
  type    : 'DotLoader',
  color   : '#3f51b5',
  size    : '60px',
  margin  : '5px'
}

Spinner.propTypes = {
  type  : PropTypes.string,
  color : PropTypes.string,
  size  : PropTypes.string
}

export default Spinner

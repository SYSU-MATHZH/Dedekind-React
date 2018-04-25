import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ApplicationModal from './ApplicationForm'

const Application = ({ dispatch }) => {
  const modalProps = {
    onOk (data) {
      dispatch({
        type: 'application/create',
        payload: {
          curItem: data,
        },
      })
    },
  }

  return (
    <ApplicationModal {...modalProps} />
  )
}

Application.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Application)

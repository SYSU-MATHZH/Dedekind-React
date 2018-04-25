import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { checkPower } from 'utils'
import { ADD, UPDATE, DELETE } from 'constants/options'
import CategoryList from './List'
import CategorySearch from './Search'
import CategoryModal from './ModalForm'

function Checking ({ location, curPowers, dispatch, checking, modal, loading }) {
  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const { field, keyword } = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onSearch (fieldsValue) {
      dispatch({
        type: 'checking/query',
        payload: {
          current: 1,
          // pageSize: 10,
          ...fieldsValue,
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create',
        },
      })
    },
  }

  const listProps = {
    checking,
    loading,
    updatePower,
    deletePower,
    onPageChange (fieldsValue) {
      dispatch({
        type: 'checking/query',
        payload: { ...fieldsValue },
      })
    },
    onDeleteItem (id) {
      dispatch({ type: 'checking/delete', payload: { id } })
    },
    onEditItem (item) {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'update',
          curItem: item,
        },
      })
    },
  }

  const modalProps = {
    modal,
    loading,
    onOk (data) {
      dispatch({
        type: data.cid
          ? 'checking/update'
          : 'checking/create',
        payload: {
          curItem: data,
        },
      })
    },
    onCancel () {
      dispatch({ type: 'modal/hideModal' })
    },
  }

  return (
    <div className="content-inner">
      <CategorySearch {...searchProps} />
      <CategoryList {...listProps} />
      <CategoryModal {...modalProps} />
    </div>
  )
}

Checking.propTypes = {
  checking: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  curPowers: PropTypes.array.isRequired,
  modal: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

function mapStateToProps ({ checking, modal, loading }) {
  return { checking, modal, loading: loading.models.checking }
}

export default connect(mapStateToProps)(Checking)

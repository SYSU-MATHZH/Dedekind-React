import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { checkPower } from 'utils'
import { ADD, UPDATE, DELETE } from 'constants/options'
import CategoryList from './List'
import CategorySearch from './Search'
import CategoryModal from './ModalForm'

function Record ({ location, curPowers, dispatch, record, modal, loading }) {
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
        type: 'record/query',
        payload: {
          current: 1,
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
    record,
    loading,
    updatePower,
    deletePower,
    onPageChange (fieldsValue) {
      dispatch({
        type: 'record/query',
        payload: { ...fieldsValue },
      })
    },
    onDeleteItem (id) {
      dispatch({ type: 'record/delete', payload: { id } })
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
          ? 'record/update'
          : 'record/create',
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

Record.propTypes = {
  record: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  curPowers: PropTypes.array.isRequired,
  modal: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

function mapStateToProps ({ record, modal, loading }) {
  return { record, modal, loading: loading.models.record }
}

export default connect(mapStateToProps)(Record)

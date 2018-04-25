import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Menu } from 'antd'
import { DataTable, DropMenu } from 'components'
import { UPDATE, DELETE } from 'constants/options'
import styles from './List.less'

const confirm = Modal.confirm

function List ({
  checking: {
    searchQuery,
    list,
    pagination,
  },
  loading,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) {
  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗(删除不可恢复)?',
      onOk () {
        onDeleteItem(record.cid)
      },
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [DELETE]: handleDeleteItem,
    }[key](record)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'cid',
      key: 'cid',
    }, {
      title: '公益时数',
      dataIndex: 'vTime',
      key: 'vTime',
    }, {
      title: '活动时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '举办单位',
      dataIndex: 'group',
      key: 'group',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
    },
  ]

  let total = pagination.total

  const getFilterList = () => {
    const { field, keyword, current, pageSize } = searchQuery
    const currentPage = current || pagination.current
    const sizePage = pageSize || pagination.pageSize

    if (field) {
      const filterTotalList = list.filter(item => item[field].indexOf(decodeURI(keyword)) > -1)
      total = filterTotalList.length
      const filterList = filterTotalList.slice((currentPage - 1) * (sizePage), currentPage * sizePage)
      return filterList
    }
    return list
  }

  const tableProps = {
    dataSource: getFilterList(),
    columns,
    loading,
    className: styles.table,
    pagination: { ...pagination, total },
    onPageChange,
    rowKey: record => record.cid,
  }

  return (
    <DataTable {...tableProps} />
  )
}

List.propTypes = {
  checking: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  updatePower: PropTypes.bool.isRequired,
  deletePower: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List

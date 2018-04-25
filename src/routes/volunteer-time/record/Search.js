import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'
import { SearchGroup } from 'components'
import { Link } from 'dva/router'

const Search = ({
  field,
  keyword,
  addPower,
  onSearch,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: '活动名称' }, { value: 'time', name: '活动申请时间' }],
    selectProps: {
      defaultValue: field || 'name',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  }

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <SearchGroup {...searchGroupProps} />
      </Col>
      {addPower &&
        <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
          <Link to="/volunteer-time/application">
            <Button size="large" type="ghost">
              <Icon type="plus-circle-o" />申请公益时
            </Button>
          </Link>
        </Col>}
    </Row>
  )
}

Search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  field: PropTypes.string,
  keyword: PropTypes.string,
  addPower: PropTypes.bool.isRequired,
}

export default Form.create()(Search)

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Icon } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ModalForm = ({
  modal: { curItem, type, visible },
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
  onOk,
  onCancel,
}) => {
  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        cid: curItem.cid,
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 申请公益时 </div> : <div><Icon type="edit" /> 修改 </div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose () {
      resetFields() // 必须项，编辑后如未确认保存，关闭时必须重置数据
    },
  }

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label="公益时数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('vTime', {
            initialValue: curItem.vTime,
            rules: [
              {
                required: true,
                message: '公益时数不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="活动名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
            rules: [
              {
                required: true,
                message: '活动名称不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="举办单位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('group', {
            initialValue: curItem.group,
            rules: [
              {
                required: true,
                message: '举办单位不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Form.create()(ModalForm)

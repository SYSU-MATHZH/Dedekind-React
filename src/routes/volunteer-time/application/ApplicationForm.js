import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Icon, Button, Row, Col, Upload, Tooltip, Select, DatePicker, InputNumber, Switch } from 'antd'
import styles from './ApplicationForm.less'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 6,
  },
}

const ApplicationForm = ({
  form: {
    getFieldDecorator,
    validateFields,
  },
  onOk,
}) => {
  function handleOk (e) {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        application: {
          contact: values.contact,
          proof: 'http://example.com',
        },
        activity: {
          title: values.title,
          date: values.date.format('YYYY-MM-DD HH:mm:ss'),
          detail: values.detail,
          group: values.group,
          team: values.team,
          is_valid: values.is_valid ? values.is_valid : false,
        },
        student: 'http://example.com',
        suahours: values.suahours ? values.suahours : 1,
        is_valid: values.is_valid ? values.is_valid : false,
      }
      console.log('Received values of form: ', data)
      onOk(data)
      onOk({ ...values, date: values.date.format('YYYY-MM-DD HH:mm:ss') })
    })
  }

  function normFile (e) {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  function onChange (value) {
    console.log('changed', value)
  }

  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  )

  return (
    <Form className={styles.applicationForm} onSubmit={handleOk}>
      <Row >
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <h2 className={styles.title}>申请个人公益时</h2>
          <p className={styles.subtitle}>你可以在这里向学院提交院内外的公益时申请</p>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      </Row>
      <hr />
      <Row >
        <Col xs={2} />
        <Col xs={22}>
          <h3>活动信息：</h3>
        </Col>
      </Row>
      <Row >
        <Col xs={2} /><Col xs={10}>
          <FormItem label="活动名称" >
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '活动名称不能为空',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col xs={2} /><Col xs={10}>
          <FormItem label="活动详情" >
            {getFieldDecorator('detail', { rules: [{ required: false }] })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row >
        <Col xs={2} /><Col xs={10}>
          <FormItem label="活动组织单位" >
            {getFieldDecorator('group', {
              rules: [
                {
                  required: true,
                  message: '活动组织单位不能为空',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col xs={2} /><Col xs={10}>
          <FormItem label="参与组别" >
            {getFieldDecorator('team', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row >
        <Col xs={2} /><Col xs={10}>
          <FormItem label={(
            <span>
              活动组织单位负责人手机号&nbsp;
              <Tooltip title="如果没有就填自己的手机号">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          >
            {getFieldDecorator('contact', {
              rules: [
                {
                  required: true,
                  message: '联系方式不能为空',
                },
              ],
            })(<Input addonBefore={prefixSelector} />)}
          </FormItem>
        </Col>
        <Col xs={2} /><Col xs={10}>
          <FormItem label="活动时间">
            {getFieldDecorator('date', {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '活动时间不能为空',
                },
              ],
            })(<DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
        </Col>
      </Row>
      <Row >
        <Col xs={2} />
        <Col xs={22}>
          <h3>公益时及证明：</h3>
        </Col>
      </Row>
      <Row >
        <Col xs={24}>
          <FormItem label="公益时数" {...formItemLayout}>

            {getFieldDecorator('suahours', { rules: [{ required: false }], initialValue: 1 })(
              <InputNumber
                min={1}
                max={100}
                formatter={value => `${value}小时`}
                parser={value => value.replace('小时', '')}
                onChange={onChange}
              />
            )}
          </FormItem>
        </Col>
      </Row>
      <FormItem label="是否为线下证明" {...formItemLayout}>
        {getFieldDecorator('is_valid', { rules: [{ required: false }], initialValue: true })(
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        )}
      </FormItem>
      <FormItem label="提交相关证明" {...formItemLayout}>
        <div className="dropbox">
          {getFieldDecorator('dragger', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          )}
        </div>
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large" className={styles.button} >提交申请</Button>
      </FormItem>
    </Form>
  )
}

ApplicationForm.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default Form.create()(ApplicationForm)

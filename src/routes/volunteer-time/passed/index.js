import React from 'react'
import { connect } from 'dva'
import { Menu, Row, Col, Card, message, Modal, Button, Form, Input } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { DropMenu } from 'components'
import { DETAIL, UPDATE, DELETE } from 'constants/options'

import { getToken, login } from 'services/login'
import { setLoginIn, menu } from 'utils'

const confirm = Modal.confirm
const FormItem = Form.Item

const handleClick = (key) => {
  message.success(`你点击了Key：${key}`)
}

const handleDeleteItem = (key) => {
  confirm({
    title: '您确定要删除这条记录吗?',
    onOk () {
      handleClick(key)
    },
  })
}

const handleMenuClick = ({ key }) => {
  return {
    [DETAIL]: handleClick,
    [UPDATE]: handleClick,
    [DELETE]: handleDeleteItem,
  }[key](key)
}

function getAllPathPowers (menuArray, curPowers) {
  return menuArray.reduce((dir, item) => {
    dir[`/${item.key}`] = curPowers[item.id]
    if (item.children) {
      item.children.reduce((cdir, cur) => {
        dir[`/${cdir}/${cur.key}`] = curPowers[cur.id]
        return cdir
      }, item.key)
      getAllPathPowers(item.children, curPowers)
    }
    return dir
  }, {})
}

const handleOk = (payload) => {
  const dataToken = getToken()
  if (dataToken.success) {
    const params = { access_token: dataToken.access_token, mobile: payload.username, username: payload.username, password: payload.password }
    const data = login(params)

    const allPathPowers = getAllPathPowers(menu, data.role_power)
    setLoginIn(payload.username, dataToken.access_token, data.role_power, allPathPowers)
  }
}


const DropMenuPage = () => (
  <div className="content-inner">
    <Row gutter={32}>
      <Col lg={8} md={12}>
        <Card title="基础菜单">
          <DropMenu>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="边框式菜单">
          <DropMenu border>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
      <Col lg={8} md={12}>
        <Card title="点击式菜单">
          <DropMenu dropDownProps={{ trigger: ['click'] }}>
            <Menu onClick={handleMenuClick}>
              <Menu.Item key={DETAIL}>详情</Menu.Item>
              <Menu.Item key={UPDATE}>编辑</Menu.Item>
              <Menu.Item key={DELETE}>删除</Menu.Item>
            </Menu>
          </DropMenu>
        </Card>
      </Col>
    </Row>
    <Row gutter={32}>
      <Col lg={8} md={12}>
        <Card title="基础菜单">
          <form onSubmit={handleOk}>
            <QueueAnim delay={200} type="top">
              <FormItem hasFeedback key="1">
                <Input size="large" placeholder="用户名" />
              </FormItem>
              <FormItem hasFeedback key="2">
                <Input size="large" type="password" placeholder="密码" />
              </FormItem>
              <FormItem key="3">
                <Button type="primary" htmlType="submit" size="large">
                  登录
                </Button>
              </FormItem>
            </QueueAnim>
          </form>
        </Card>
      </Col>
    </Row>
  </div>
)

export default connect()(DropMenuPage)

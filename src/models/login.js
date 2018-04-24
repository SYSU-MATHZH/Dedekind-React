import { routerRedux } from 'dva/router'
import { setLoginIn, menu } from 'utils'
import { login } from 'services/login'

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

export default {
  namespace: 'login',
  state: {
  },
  effects: {
    * submit ({
      payload,
    }, { call, put, select }) {
      // const dataToken = yield call(getToken)
      // if (dataToken.success) {
      const params = { mobile: payload.username, username: payload.username, password: payload.password }
      const data = yield call(login, params)
      data.role_power = {
        1: [1, 2],

        // 用户管理
        2: [1],
        3: [1, 2, 3, 4, 5],
        4: [1, 2, 3, 4, 5],
        5: [1, 2, 3, 4, 5],

        // 系统管理
        6: [1],
        7: [1, 2, 4],

        // 前端分页
        8: [1],
        9: [1, 2, 3, 4, 5],

        // 测试导航
        10: [1],
        11: [1, 2],

        12: [1],
        13: [1, 2],
        14: [1, 2],
        // ui
        15: [1],
        16: [1, 2],
        17: [1, 2],
        18: [1, 2],
        19: [1, 2],

        // 公益时
        20: [1],
        21: [1, 2],
        22: [1, 2],
      }
      const allPathPowers = getAllPathPowers(menu, data.role_power)
      setLoginIn(payload.username, data.role_power, allPathPowers)

      if (data) {
        yield put({
          type: 'app/loginSuccess',
          payload: {
            user: {
              name: payload.username,
            },
            userPower: data.role_power,
          },
        })

        const nextLocation = yield select(state => state.routing.locationBeforeTransitions)
        const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : '/dashboard'
        yield put(routerRedux.push({
          pathname: nextPathname,
          search: nextLocation.state && nextLocation.state.nextSearch,
        }))
      }
      // }
    },
  },
  reducers: {
  },
}

import { create } from 'services/volunteer-time/volunteer-time'

export default {
  namespace: 'application',
  state: {
    isPostBack: true, // 判断是否是首次加载页面，作为前端分页判断标识符
  },

  effects: {
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload.curItem)
      if (data && data.success) {
        yield put({ type: 'querySuccess', payload: { isPostBack: true } })
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },

}

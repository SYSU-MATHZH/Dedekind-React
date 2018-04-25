
const API = 'http://127.0.0.1:9999/apis'

export default {
  name: 'Dedekind',
  prefix: '',
  footerText: 'Dedekind 版权所有 © 2018 由 React 提供支持',
  logoSrc: '/logo.png',
  logoText: 'Dedekind',
  needLogin: true,
  apiPrefix: '/apis',
  API,
  api: {
    loginUrl: `${API}/login/`,
    vTimeUrl: `${API}/suas/`, // vTime == volunteer-time
    userLoginUrl: `${API}/user/login`,
    userLogoutUrl: `${API}/user/logout`,
    userInfoUrl: `${API}/userInfo`,
    usersUrl: `${API}/users`,
    postsUrl: `${API}/posts`,
    userUrl: `${API}/user/:id`,
    dashboardUrl: `${API}/dashboard`,
    menusUrl: `${API}/menus`,
    weatherUrl: `${API}/weather`,
    v1testUrl: `${API}/test`,
  },
}

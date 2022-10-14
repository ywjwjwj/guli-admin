import request from '@/utils/request'

const url_base = '/user'
// 登录
export function login(username, password) {
 // debugger
  return request({
    url: url_base + '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: url_base + '/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  //debugger
  return request({
    url: url_base + '/logout',
    method: 'post'
  })
}

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: url_base + '/menu',
    method: 'get'
  })
}

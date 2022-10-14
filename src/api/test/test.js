import request from '@/utils/request'

function resetPass(username,password)  {
  return request({
    url: '/admin/acl/user/resetPass',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

function getFlop()  {
  return request({
    url: '/member/getFlop',
    method: 'get'
  })
}

function getCard()  {
  return request({
    url: '/member/getCard',
    method: 'get'
  })
}

export default{
  resetPass,
  getFlop,
  getCard
}

import request from '@/utils/request.js'

const api_name = '/subject'

export default{
  //课程分类列表(树形)
  getSubjectTree(id) {
      return request({
          url: `${api_name}/getSubjectTree`,
          method: 'get'
      })
  },
}
import request from '@/utils/request.js';

// export function getList(params) {
//   return request({
//     url: '/eduservice/edu-teacher/selectAllTeacher',
//     method: 'get',
//     params
//   })
// }

const api_name = '/teacher'

export default {
  //1 讲师列表 条件查询分页
  getTeacherListPage(current,limit,teacherQuery){
    return request({
      //直接拼接
      // url: '/eduservice/edu-teacher/pageTeacherCondition2'+'/'+current+'/'+limit',
      url: `${api_name}/pageTeacherCondition2/${current}/${limit}`,
      method: 'post',
      //data表示将对象转换成json传递给接口
      data: teacherQuery
    })
  },
  // 删除讲师
  removeDataById(id){
    return request({
      url: `${api_name}/${id}2`,
      method: 'delete',
    })
  },
  //添加讲师
  addTeacher(teacher){
    return request({
      url: `${api_name}/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  //回显
  getById(id) {
      return request({
          url: `${api_name}/getTeacher/${id}`,
          method: 'get'
      })
  },

  //修改
  updateTeacher(teacher) {
      return request({
          url: `${api_name}/updateTeacher`,
          method: 'post',
          data: teacher
      })
  },
}

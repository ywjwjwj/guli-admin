import request from '@/utils/request'

const api_name = '/course'

export default {
  //添加课程记录
  addCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },

  //查询所有讲师
  getListTeacher() {
    return request({
      url: `/teacher/selectAllTeacher2`,
      method: 'get'
    })
  },

  //根据课程id查询课程基本信息
  getCourseInfoId(courseId) {
    return request({
      url: `${api_name}/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },

  //修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/updateCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },

  //课程确认信息显示
  getCoursePublishInfo(courseId) {
      return request({
        url: `${api_name}/getPublishCourseInfo/${courseId}`,
        method: 'get'
      })
  },

  //课程最终发布
  publishCourse(courseId) {
      return request({
        url: `${api_name}/publishCourse/${courseId}`,
        method: 'put'
      })
  },

  //查询所有课程
  getCourseList() {
      return request({
        url: `${api_name}/getCourseList/${courseId}`,
        method: 'get'
      })
  },

  //分页查询
  getCourseList(current,limit,courseQuery) {
      return request({
        url: `${api_name}/getCourseList/${current}/${limit}`,
        method: 'post',
        data : courseQuery
      })
  },

  //删除
  removeDataById(courseId){
    return request({
      url: `${api_name}/${courseId}`,
      method: 'delete'
    })
  },

}

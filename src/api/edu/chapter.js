import request from '@/utils/request'

const api_name = '/chapter'

export default {

  //查询课程大纲和小节列表
  getChapterVideo(courseId) {
    return request({
      url: `${api_name}/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },

  //添加章节
  addChapter(chapter){
    return request({
      url: `${api_name}/addChapter`,
      method: 'POST',
      data: chapter
    })
  },

  //根据id查询章节
  getChapter(chapterId){
    return request({
      url: `${api_name}/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },

  //修改章节
  updateChapter(chapter){
    return request({
      url: `${api_name}/updateChapter`,
      method: 'POST',
      data: chapter
    })
  },

  //删除章节
  deleteChapter(chapterId){
    return request({
      url: `${api_name}/${chapterId}`,
      method: 'delete'
    })
  },

}

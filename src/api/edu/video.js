import request from '@/utils/request'

const api_name = '/video'

export default {

  //添加章节
  addVideo(video){
    return request({
      url: `${api_name}/addVideo`,
      method: 'POST',
      data: video
    })
  },

  //根据id查询章节
  getVideoInfoById(videoId){
    return request({
      url: `${api_name}/getVideoInfoById/${videoId}`,
      method: 'get'
    })
  },

  //修改章节
  updateVideo(video){
    return request({
      url: `${api_name}/updateVideo`,
      method: 'POST',
      data: video
    })
  },

  //删除章节
  deleteVideo(videoId){
    return request({
      url: `${api_name}/${videoId}`,
      method: 'delete'
    })
  },

  
}

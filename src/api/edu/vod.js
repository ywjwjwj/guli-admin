import request from '@/utils/request'

const api_name = '/vod'

export default {

  removeById(videoId) {
    return request({
      url: `${api_name}/removeVideo/${videoId}`,
      method: 'delete'
    })
  }
}

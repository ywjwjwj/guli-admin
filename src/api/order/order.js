import request from '@/utils/request'

const api_name = '/order'

export default {

  //添加章节
  getSumMoney(day){
    return request({
      url: `${api_name}/getSumMoney`,
      method: 'GET'
    })
  }



}

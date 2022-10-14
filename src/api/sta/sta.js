import request from '@/utils/request'

const api_name = '/staservice/sta'

export default {

  //添加章节
  registerCount(day){
    return request({
      url: `${api_name}/registerCount/${day}`,
      method: 'POST'
    })
  },

  //获取统计数据
  getStaShowData(searchObj){
    return request({
      url: `${api_name}/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'GET'
    })
  },

  //获取系统信息
  getSysInfo(){
    return request({
      url: `${api_name}/showData/getSysInfo`,
      method: 'GET'
    })
  }


}

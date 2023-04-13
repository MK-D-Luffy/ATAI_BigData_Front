import request from '@/utils/request'

export default {

  //查询前五条公告
  getLatestNotice(type) {
    return request({
      url: `/ataiservice/atai-notice/getLatestNotice?type=` + type,
      method: 'get',
    })
  },

  //查询4热门老师
  getHotTeacher() {
    return request({
      url: `/ataiservice/indexfront/indexHotTeacher`,
      method: 'get'
    })
  }
}

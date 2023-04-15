import request from '@/utils/request'

export default {

  getLargeCompetition(){
    return request({
      url: `/ataiservice/atai-competition/getLargeCompetition`,
      method: 'get',
    })
  },
  getHotCourses() {
    return request({
      url: `/ataiservice/atai-course/getHotCourses`,
      method: 'get',
    })
  },
  getHotDatasets() {
    return request({
      url: `/ataiservice/atai-dataset/getHotDatasets`,
      method: 'get'
    })
  }
}

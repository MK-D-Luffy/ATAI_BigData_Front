import request from '@/utils/request'

export default {
  getDataset(id) {
    return request({
      url: `/ataiservice/atai-dataset/getDataset/${id}`,
      method: 'get',
    })
  },
  getUserDataset(userid) {
    return request({
      url: `/ataiservice/atai-dataset/getUserDataset/${userid}`,
      method: 'get',
    })
  },
  getDatasetPageList(page, limit, datasetObj) {
    return request({
      url: `/ataiservice/atai-dataset/pageDataset/${page}/${limit}`,
      method: 'post',
      data: datasetObj
    })
  },
  addDataset(datasetInfo) {
    return request({
      url: `/ataiservice/atai-dataset/addDataset`,
      method: 'post',
      data: datasetInfo
    })
  },
  updateDataset(datasetInfo) {
    return request({
      url: `/ataiservice/atai-dataset/updateDataset`,
      method: 'post',
      data: datasetInfo
    })
  },
  deleteDataset(id) {
    return request({
      url: `/ataiservice/atai-dataset/${id}`,
      method: 'delete'
    })
  },
  addWatch(id){
    return request({
      url: `/ataiservice/atai-dataset/addWatch/${id}`,
      method: 'get'
    })
  },
  addDownload(id){
    return request({
      url: `/ataiservice/atai-dataset/addDownload/${id}`,
      method: 'get'
    })
  },
}

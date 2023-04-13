import request from '@/utils/request'

export default {
  getCourse(id) {
    return request({
      url: `/ataiservice/atai-course/getCourse/${id}`,
      method: 'get',
    })
  },

  getCourseClass(courseId) {
    return request({
      url: `/ataiservice/atai-course/getCourseClass/${courseId}`,
      method: 'get',
    })
  },

  getClass(classId) {
    return request({
      url: `/ataiservice/atai-course/getClass/${classId}`,
      method: 'get',
    })
  },

  getCourseUser(userid, courseid) {
    return request({
      url: `/ataiservice/atai-course/getCourseUser/${userid}/${courseid}`,
      method: 'get',
    })
  },

  getCoursePageList(page, limit, courseObj) {
    return request({
      url: `/ataiservice/atai-course/pageCourse/${page}/${limit}`,
      method: 'post',
      data: courseObj
    })
  },

  addCourseUser(userCourseInfo) {
    return request({
      url: `/ataiservice/atai-course/addCourseUser`,
      method: 'post',
      data: userCourseInfo
    })
  },

  updateCourseUser(userCourseInfo) {
    return request({
      url: `/ataiservice/atai-course/updateCourseUser`,
      method: 'post',
      data: userCourseInfo
    })
  },

  deleteCourseUser(userid,courseid) {
    return request({
      url: `/ataiservice/atai-course/user/${userid}/${courseid}`,
      method: 'delete',
    })
  },

}

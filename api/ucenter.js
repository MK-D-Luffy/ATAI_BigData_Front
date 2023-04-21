import request from '@/utils/request'

export default {

  //用户信息修改功能
  updateMemberInfo(ucenterMember) {
    return request({
      url: `/ataiucenter/ucenter/updateMember`,
      method: 'post',
      data: ucenterMember
    })
  },

  //判断用户名是否重复
  checkNickname(nickname) {
    return request({
      url: `/ataiucenter/ucenter/checkNickname/${nickname}`,
      method: 'get',
    })
  },

  //判断手机号是否重复
  checkPhone(phone) {
    return request({
      url: `/ataiucenter/ucenter/checkPhone/${phone}`,
      method: 'get',
    })
  },

  //判断邮箱是否重复
  checkEmail(email) {
    return request({
      url: `/ataiucenter/ucenter/checkEmail/${email}`,
      method: 'get',
    })
  },

  //修改密码
  changePassword(formItem) {
    return request({
      url: `/ataiucenter/ucenter/changePwd`,
      method: 'post',
      data: formItem
    })
  },

  changeMobileOrEmail(params, id) {
    return request({
      url: `/ataiucenter/ucenter/changeMobileOrEmail/${id}`,
      method: 'post',
      data: params
    })
  },

  validateSecurity(params, id) {
    return request({
      url: `/ataiucenter/ucenter/validateSecurity/${id}`,
      method: 'post',
      data: params
    })
  },

  getUserCompetitions(userId) {
    return request({
      url: `/ataiservice/atai-competition/getUserCompetitions/${userId}`,
      method: 'get'
    })
  },

  getUserCourses(userId) {
    return request({
      url: `/ataiservice/atai-course/getCourseUsers/${userId}`,
      method: 'get'
    })
  },

  getUserDatasets(userId) {
    return request({
      url: `/ataiservice/atai-dataset/getUserDatasets/${userId}`,
      method: 'get'
    })
  },

  //===============================个人简历===============================
  getResumeById(userId) {
    return request({
      url: `/ataiucenter/ucenter/getUserResume/${userId}`,
      method: 'get'
    })
  },
  updateResume(resume) {
    return request({
      url: `/ataiucenter/ucenter/updateUserResume`,
      method: 'post',
      data: resume
    })
  },

}

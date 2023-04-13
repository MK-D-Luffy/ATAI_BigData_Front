import request from '@/utils/request'

export default {

  //用户信息修改功能
  updateMemberInfo(ucenterMember) {
    return request({
      url: `/eduucenter/ucenter-member/updateMember`,
      method: 'post',
      data: ucenterMember
    })
  },

  //判断用户名是否重复
  checkNickname(nickname) {
    return request({
      url: `/eduucenter/ucenter-member/checkNickname/${nickname}`,
      method: 'get',
    })
  },

  //判断手机号是否重复
  checkPhone(phone) {
    return request({
      url: `/eduucenter/ucenter-member/checkPhone/${phone}`,
      method: 'get',
    })
  },

  //判断邮箱是否重复
  checkEmail(email) {
    return request({
      url: `/eduucenter/ucenter-member/checkEmail/${email}`,
      method: 'get',
    })
  },

  //修改密码
  changePassword(formItem) {
    return request({
      url: `/eduucenter/ucenter-member/changePwd`,
      method: 'post',
      data: formItem
    })
  },

  changeMobileOrEmail(params,id) {
    return request({
      url: `/eduucenter/ucenter-member/changeMobileOrEmail/${id}`,
      method: 'post',
      data: params
    })
  },

  validateSecurity(params,id){
    return request({
      url: `/eduucenter/ucenter-member/validateSecurity/${id}`,
      method: 'post',
      data: params
    })
  }

}

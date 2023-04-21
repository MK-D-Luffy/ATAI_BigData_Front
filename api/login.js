import request from '@/utils/request'

export default {
  //根据token获取用户信息
  getLoginMemberInfo() {
    return request({
      url: `/ataiucenter/ucenter/getMemberInfo`,
      method: 'get'
    })
  },

  //登录
  loginMember(loginInfo) {
    return request({
      url: `/ataiucenter/ucenter/login`,
      method: 'post',
      data: loginInfo
    })
  },

  //根据id获取用户信息
  getMemberInfo(id) {
    return request({
      url: `/ataiucenter/ucenter/getUserInfoOrder/${id}`,
      method: 'post'
    })
  },

  //根据id获取用户信息（个人中心用）
  getMemberInfoSelf(id) {
    return request({
      url: `/ataiucenter/ucenter/getUserInfo/${id}`,
      method: 'post'
    })
  },

}

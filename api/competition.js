import request from '@/utils/request'

export default {
  //分页查询比赛的方法
  getCompetitionPageList(page, limit, compObj) {
    return request({
      url: `/atitcompetition/compfront/getCompetitionPageList/${page}/${limit}`,
      method: 'post',
      data: compObj
    })
  },
  //查询所有分类的方法
  getAllSubject() {
    return request({
      url: '/atitcompetition/compfront/getAllSubject',
      method: 'get'
    })
  },

  //根据(用户id)token，比赛id查询信息
  getUserCompetition(competitionId) {
    return request({
      url: `/atitcompetition/atai-user-competition/getUserCompetition/${competitionId}`,
      method: 'get',
    })
  },



  // 根据比赛id查询比赛的信息
  getCompetition(competitionId) {
    return request({
      url: `/atitcompetition/atai-competition/getCompetition/${competitionId}`,
      method: 'get',
    })
  },

  //根据比赛id，团队名称添加团队
  insertUserCompetition(competitionId) {
    return request({
      url: `/atitcompetition/atai-user-competition/insertUserCompetition/${competitionId}`,
      method: 'get',
    })
  },

  //根据比赛id，团队id查询信息
  getTeamCompetition(competitionId, teamId) {
    return request({
      url: `/atitcompetition/atai-user-competition/getTeamCompetition/${competitionId}/${teamId}`,
      method: 'get',
    })
  },

  //根据比赛id，查询所有的排名信息
  getRanking(competitionId) {
    return request({
      url: `/atitcompetition/atai-user-competition/getRanking/${competitionId}`,
      method: 'get',
    })
  },

  //根据比赛id，团队名，获取当前排名
  getRank(competitionId, nickname) {
    return request({
      url: `/atitcompetition/atai-user-competition/getRank/${competitionId}/${nickname}`,
      method: 'get',
    })
  },

  //查询当前用户的比赛列表
  getMyCompetitionList() {
    return request({
      url: `/atitcompetition/atai-user-competition/getMyCompetitionList`,
      method: 'get',
    })
  },

  //查询全部比赛分类
  findAll() {
    return request({
      url: `/atitcompetition/atai-comp-level/findAll`,
      method: 'get',
    })
  },

  //通过key查询团队
  searchTeams(competitionId, teamName_key) {
    return request({
      url: `/atitcompetition/atai-user-competition/searchTeams/${competitionId}/${teamName_key}`,
      method: 'get',
    })
  },

  changeTeamName(competitionId, oldTeamId, newTeamName) {
    return request({
      url: `/atitcompetition/atai-user-competition/changeTeamName/${competitionId}/${oldTeamId}/${newTeamName}`,
      method: 'get',
    })
  },

  createTeamName(competitionId, userId) {
    return request({
      url: `/atitcompetition/atai-user-competition/createTeamName/${competitionId}/${userId}`,
      method: 'get',
    })
  },

  applyToJoinTeam(competitionId, teamName, userId) {
    return request({
      url: `/atitcompetition/atai-user-competition/applyToJoinTeam/${competitionId}/${teamName}/${userId}`,
      method: 'get',
    })
  },

  getSenders(competitionId, receiveId) {
    return request({
      url: `/atitcompetition/atai-user-competition/getSenders/${competitionId}/${receiveId}`,
      method: 'get',
    })
  },

  acceptMember(competitionId, senderId,userId, newTeamName) {
    return request({
      url: `/atitcompetition/atai-user-competition/acceptMember/${competitionId}/${senderId}/${userId}/${newTeamName}`,
      method: 'get',
    })
  },

  refuseMember(competitionId,senderId){
    return request({
      url: `/atitcompetition/atai-user-competition/refuseMember/${competitionId}/${senderId}`,
      method: 'get',
    })
  },

  quitTeam(competitionId,userId){
    return request({
      url: `/atitcompetition/atai-user-competition/quitTeam/${competitionId}/${userId}`,
      method: 'get',
    })
  },

  getReceivers(competitionId,senderId){
    return request({
      url: `/atitcompetition/atai-user-competition/getReceivers/${competitionId}/${senderId}`,
      method: 'get',
    })
  },
}

import request from '@/utils/request'

export default {
  //分页查询比赛的方法
  getCompetitionPageList(page, limit, compObj) {
    return request({
      url: `/ataiservice/atai-competition/pageCompetitionCondition/${page}/${limit}`,
      method: 'post',
      data: compObj
    })
  },
  // 根据比赛id查询比赛的信息
  getCompetition(competitionId) {
    return request({
      url: `/ataiservice/atai-competition/getCompetition/${competitionId}`,
      method: 'get',
    })
  },
  getTeamPageList(page, limit, name) {
    return request({
      url: `/ataiservice/atai-competition/pageTeamCondition/${page}/${limit}`,
      method: 'post',
      name: name
    })
  },
  //根据比赛id，团队id查询信息
  getCompetitionTeam(teamId) {
    return request({
      url: `/ataiservice/atai-competition/getCompetitionTeam/${teamId}`,
      method: 'get',
    })
  },
  getTeamUsers(teamId) {
    return request({
      url: `/ataiservice/atai-competition/getTeamUsers/${teamId}`,
      method: 'get',
    })
  },
  //根据用户id，比赛id查询是否报名比赛信息
  getTeamByUserCompetition(userId, competitionId) {
    return request({
      url: `/ataiservice/atai-competition/getTeamByUserCompetition/${userId}/${competitionId}`,
      method: 'get',
    })
  },
  getJoinTeamUser(competitionId, teamId) {
    return request({
      url: `/ataiservice/atai-competition/getJoinTeamUser/${competitionId}/${teamId}`,
      method: 'get',
    })
  },
  getRecordsByUserId(competitionId,userId) {
    return request({
      url: `/ataiservice/atai-competition/getRecordByUserId/${competitionId}/${userId}`,
      method: 'get',
    })
  },
  getRecordsByTeamId(competitionId,teamId) {
    return request({
      url: `/ataiservice/atai-competition/getRecordByTeamId/${competitionId}/${teamId}`,
      method: 'get',
    })
  },
  // 添加比赛信息
  addCompetitionInfo(competitionInfo) {
    return request({
      url: `/ataiservice/atai-competition/addCompetition`,
      method: 'post',
      data: competitionInfo
    })
  },

  // 3.修改比赛信息
  updateCompetition(competitionInfo) {
    return request({
      url: `/atitcompetition/atai-competition/updateCompetition`,
      method: 'post',
      data: competitionInfo
    })
  },

  attendCompetition(competitionTeam, userId) {
    return request({
      url: `/ataiservice/atai-competition/attendCompetition/${userId}`,
      method: 'post',
      data: competitionTeam
    })
  },

  //根据比赛id，查询所有的排名信息
  getRankList(competitionId) {
    return request({
      url: `/ataiservice/atai-competition/getRankList/${competitionId}`,
      method: 'get',
    })
  },

  //查询当前用户的比赛列表
  getMyCompetitionList(current, limit) {
    return request({
      url: `/atitcompetition/atai-user-competition/getMyCompetitionList/${current}/${limit}`,
      method: 'get',
    })
  },

  joinTeam(teamJoin) {
    return request({
      url: `/ataiservice/atai-competition/joinTeam`,
      method: 'post',
      data: teamJoin
    })
  },

  acceptJoinTeam(userId, competitionId, teamId) {
    return request({
      url: `/ataiservice/atai-competition/acceptJoinTeam/${userId}/${competitionId}/${teamId}`,
      method: 'get',
    })
  },

  refuseJoinTeam(userId, competitionId, teamId) {
    return request({
      url: `/ataiservice/atai-competition/refuseJoinTeam/${userId}/${competitionId}/${teamId}`,
      method: 'get',
    })
  }

}

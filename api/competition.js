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
    //比赛详情的方法
    getCompetitionDetailInfo(Id) {
        return request({
            url: `/atitcompetition/atai-competition/getCompetition/${Id}`,
            method: 'get',
        })
    },

    //根据(用户id)token，比赛id查询信息
    getUserCompetition(compentitionId) {
        return request({
            url: `/atitcompetition/atai-user-competition/getUserCompetition/${compentitionId}`,
            method: 'get',
        })
    },

  // 根据比赛id查询比赛的信息
  getCompetition(compentitionId) {
    return request({
      url: `/atitcompetition/atai-competition/getCompetition/${compentitionId}`,
      method: 'get',
    })
  },

    //根据比赛id，团队名称添加团队
    insertUserCompetition(competitionUserInfo) {
        return request({
            url: `/atitcompetition/atai-user-competition/insertUserCompetition`,
            method: 'post',
            data: competitionUserInfo
        })
    },

    //根据比赛id，团队id查询信息
    getTeamCompetition(compentitionId, teamId) {
        return request({
            url: `/atitcompetition/atai-user-competition/getUserCompetition/${compentitionId}/${teamId}`,
            method: 'get',
        })
    },

    //根据比赛id，查询所有的排名信息
    getRanking(compentitionId) {
        return request({
            url: `/atitcompetition/atai-user-competition/getRanking/${compentitionId}`,
            method: 'get',
        })
    },

  //根据比赛id，团队名，获取当前排名
  getRank(compentitionId,teamName) {
    return request({
      url: `/atitcompetition/atai-user-competition/getRanking/${compentitionId}/${teamName}`,
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
  searchTeams(compentitionId, teamName_key) {
    return request({
      url: `/atitcompetition/atai-user-competition/searchTeams/${compentitionId}/${teamName_key}`,
      method: 'get',
    })
  },
}

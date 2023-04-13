import request from '@/utils/request'
export default {
  //获取评论列表
  getPageList(page, limit, courseId) {
      return request({
        url: `/ataiservice/edu-comment/commentList/${page}/${limit}`,
        method: 'get',
        params: {courseId}
      })
    },

   //用户添加评论
   addComment(comment) {
      return request({
        url: `/ataiservice/edu-comment/saveComment`,
        method: 'post',
        data: comment
      })
    },

    //用户删除评论
    deleteComment(commentId) {
       return request({
         url: `/ataiservice/edu-comment/deleteComment/${commentId}`,
         method: 'delete',
       })
     },

     //判断是否是该用户的评论
     isComment(commentId) {
       return request({
         url: `/ataiservice/edu-comment/isComment/${commentId}`,
         method: 'get',
         params: {commentId}
       })
     },

     //根据文章获取评论
     getCommentsByArticle(page,limit,id) {
      return request({
        url: `/ataiservice/atai-comment/commentList/${page}/${limit}/${id}`,
        method: 'get'
      })
    },

    //文章下发布评论
    publishComment(comment) {
      return request({
        url: '/ataiservice/atai-comment/saveComment',
        method: 'post',
        data: comment
      })
    }
}

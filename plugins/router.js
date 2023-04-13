import cookie from 'js-cookie'
import {Message} from "element-ui";  // 引入

export default ({app, store}) => {
  app.router.beforeEach((to, from, next) => {

    let userToken = cookie.get("ATAI_BigData_ucenter")
    let nextPath = to.path

    //如果用户未登录
    if (!userToken) {
      if (nextPath.startsWith("/ucenter") || nextPath.startsWith("/write")) {
        Message.info('请先登录再进行下一步操作')
        next('/login')
      }
    }
    next()
    // 因为逻辑是第一次进来，判断用户信息不存在，即!user为true，由于使用的是next('/login')而非next()，
    // 会再次进入路由跳转，next()方法没有参数是直接进入页面，不会再次进入路由拦截，有参数则会，因为跳转，
    // 所以再次进入路由，再次判断，再次进入路由，再次判断，循环往复无限循环
    // 所以一定要加to.path !== 'login'的判断
  });
}

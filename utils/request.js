import axios from 'axios'
//引入调用js-cookie
import cookie from 'js-cookie'
import {
  MessageBox,
  Message
} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8666', // api的base_url
  timeout: 20000 // 请求超时时间
})


//解决重复请求的问题
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}


//创建拦截器 获取token 传递token到cookie中
service.interceptors.request.use(
  config => {
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({u: config.url + '&' + config.method, f: c});
    });

    //判断cookie里面是否有ATAI_BigData_token数据
    if (cookie.get('ATAI_BigData_token')) {
      //把获取到的token放入cookie
      config.headers['token'] = cookie.get('ATAI_BigData_token');
      // alert("token"+config.headers['token'])
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除

    // debugger
    if (response.data.code === 28004) {
      // console.log("response.data.resultCode是28004")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code !== 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });

export default service

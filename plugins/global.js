import Vue from 'vue'

const global = {
  install(Vue) {
    Vue.prototype.global = {
      // ip: "127.0.0.1"
     // baseURL: "https://baiyunrain.mynatapp.cc:8666"
     baseURL: "http://localhost:8666"
    }
  }
}

Vue.use(global)


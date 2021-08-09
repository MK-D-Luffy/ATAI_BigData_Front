import Vue from 'vue'

const global = {
  install(Vue) {
    Vue.prototype.global = {
      // ip: "127.0.0.1"
      ip: "localhost"
      // ip: "192.168.10.1"
      // ip: "172.16.2.151"
      // ip: "8.129.73.254"
      // ip: "baiyunrain.top"
    }
  }
}

Vue.use(global)

import Vue from 'vue'

const global = {
  install(Vue) {
    Vue.prototype.global = {
      ip: "192.168.10.1"
      // ip: "8.129.73.254"
      // ip: ".baiyunrain.top"
    }
  }
}

Vue.use(global)

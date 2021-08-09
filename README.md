## NuxtJS 项目部署

- 先对 nuxt 项目进行npm run build，对.nuxt、static、package.json、nuxt.config.js 文件进行拷贝至部署环境。 
  

- 在所在目录中执行 npm install 安装前端所需依赖，npm start运行。


- 出现 vue-meta 问题可以尝试执行下面的操作
  
  - 将 node_modules 和 package-lock.json 删除
  - npm cache clean --force
  - npm i
  
## 版本更新

### 版本号 2.2
1.在default.vue中添加<client-only>标签，解决 npm start 问题。

2.添加了404页面(在layouts中添加了error.vue)。

3.在login.vue中添加密码加密。

4.在plugins中添加router.js，在nuxt.config.js中配置，实现路由拦截。


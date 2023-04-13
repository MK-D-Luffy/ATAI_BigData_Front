## NuxtJS 项目部署





netstat -ano | findstr 8001
taskkill -pid  8001 -f













- 先对 nuxt 项目进行npm run build，对.nuxt、static、package.json、nuxt.config.js 文件进行拷贝至部署环境。
- 
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

### 版本号 2.3
1.修改了cookie的绑定域，使其能够在公网上被绑定访问。

2.修复了验证码请求重复提交的问题。

3.在competition.js中添加了运行代码runCode接口。

4.个人中心的个人信息页面添加并实现了修改绑定手机号和邮箱的按钮。

5.获取验证码按钮功能改进。

6.验证码请求统一放到后端处理。

7.修改了验证码的校验次数(5次)。

8.修改密码页面增加了邮箱验证和手机号验证两种方式，并增加了确认密码。

9.scrollPage组件高度设置为0

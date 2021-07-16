## NuxtJS 项目部署

- 先对 nuxt 项目进行npm run build，对.nuxt、static、package.json、nuxt.config.js 文件进行拷贝至部署环境。 
  
- 在所在目录中执行 npm install 安装前端所需依赖，npm start运行。


- 出现 vue-meta 问题可以尝试执行下面的操作
  
  - 将 node_modules 和 package-lock.json 删除
  - npm cache clean --force
  - npm i

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```


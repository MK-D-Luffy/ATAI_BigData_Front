const Mock = require('mockjs')
let id = Mock.mock('@id');
console.log(id)

let obj = Mock.mock({
  id: '@id'
})
console.log(obj)

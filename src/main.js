import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import Fly from "flyio/dist/npm/wx"
let fly = new Fly; //实例化
Vue.prototype.$http = fly //将fly实例挂在vue原型上

//添加请求拦截器
fly.interceptors.request.use((request) => {
  
  //跳过登陆
  if(request.url.indexOf('/login') != -1){
    return request;
  }
    let token = wx.getStorageSync('TOKEN')
    if (token) {
      //给所有请求添加自定义header
      request.headers["x-access-token"] = token;

    } else {
      wx.navigateTo({
        url: '/pages/login/main'
      })
    }
      //打印出请求体
      console.log(request.body)
      //终止请求
      //var err=new Error("xxx")
      //err.request=request
      //return Promise.reject(new Error(""))

      //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
      return request;
    })





const app = new Vue(App)
app.$mount()

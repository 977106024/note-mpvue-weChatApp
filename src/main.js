import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;	//实例化
Vue.prototype.$http=fly //将fly实例挂在vue原型上
const app = new Vue(App)
app.$mount()

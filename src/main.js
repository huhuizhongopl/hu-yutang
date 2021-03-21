import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'

Vue.prototype.$http=axios

Vue.use(Vant);

Vue.config.productionTip = false
//后端路由拦截
axios.interceptors.request.use(
config => {
    let token = sessionStorage.getItem("token"); 
    if (token) {  
      // 判断是否存在token，如果存在的话，则每个http header都加上token           
      config.headers.Authorization = 'Bearer '+token;       
    }       
    return config;   
  },   
  err => {       
    return Promise.reject(err);   
  });
//前端路由拦截
router.beforeEach((to,from,next)=>{
    // console.log("to",to)
    // console.log("from",from)
    let token = sessionStorage.getItem("token");
    if(to.meta.requireAuth && !token){
        if(from.name!=='/login'){
          return  next('/login')
        }
    }
    next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/Game.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/mygame',
    name: 'mygame',
    component: () => import('../views/MyGame.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/gamedetail',
    name: 'gamedetail',
    component: () => import('../views/GameDetail.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/creategame',
    name: 'creategame',
    component: () => import('../views/CreateGame.vue'),
    meta:{
        requireAuth:true,
        keepAlive:true
    }
  },
  {
    path: '/friendmsg',
    name: 'friendmsg',
    component: () => import('../views/FriendMsg.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/createmsg',
    name: 'createmsg',
    component: () => import('../views/CreateMsgs.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta:{
        requireAuth:true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: () => import('../views/MyOrder.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/selvenue',
    name: 'selvenue',
    component: () => import('../views/SelVenue.vue'),
    meta:{
        requireAuth:true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router

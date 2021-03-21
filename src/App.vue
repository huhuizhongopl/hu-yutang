<template>
  <div id="app">
    <van-tabbar v-model="active" route active-color="#007ae8" inactive-color="#4c555a" v-if="showTab">
      <van-tabbar-item icon="home-o" to="/">场馆</van-tabbar-item>
      <van-tabbar-item icon="certificate" to="/game">活动</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/friendmsg">发现</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/about">我的</van-tabbar-item>
    </van-tabbar>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default{
  data(){
    return{
      active:0
    }
  },
  computed:{
        showTab(){
            let whiteList=["home","friendmsg","game","about"]
            let name=this.$route.name
            let bool=whiteList.includes(name);
            return bool
        }
  },
  created(){
    //console.log(this.$route)
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}
</style>

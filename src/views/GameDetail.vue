<template>
  <div class="gamedetail">
      <van-nav-bar
      title="活动详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      >
      <template #right>
        <van-icon name="plus" size="18" @click="addGame"/>
      </template>
      </van-nav-bar>
      <div class="seat_game_detail_top"></div>
      <div class="message">
          <p>创建时间：{{gameDetail.created_at}}</p>
          <p>场馆名称：{{gameDetail.venue_name}}</p>
          <p>活动名称：{{gameDetail.title}}</p>
          <p>活动类型：{{gameDetail.type.name}}</p>
          <p>组织者：{{gameDetail.user.name}}</p>
          <p>联系电话：{{gameDetail.user.tel}}</p>
          <p>活动时间：{{gameDetail.datetime}}</p>
          <p>报名用户：{{gameDetail.users_count}}/{{gameDetail.number}}</p>
      </div>
      <div class="des">
        <p>活动说明</p>
        <p>{{gameDetail.des}}</p>
      </div>
      <div class="oldJoinButton" v-if="gameDetail.is_join">已报名参加</div>
      <div class="oldJoinButton" v-else-if="gameDetail.is_full">已满员</div>
      <div class="newJoinButton" v-else @click="joinGame(gameDetail.id)">报名参加</div>
  </div>
</template>

<script>
export default {
    data(){
      return{
          gameDetail:{}
      }
    },
    methods:{
        addGame(){
          this.$router.push('/creategame')
        },
        async joinGame(id){
            let res=await this.$http.get('/game/join/'+id)
            //console.log("参加活动",res)
            if(res.status===200){
              this.$toast("参加活动成功")
            }else{
              this.$toast("参加活动失败")
            }
            this.$router.push('/mygame')
        },
        async getGameDetail(gameId){
            let res=await this.$http.get('/game/detail/'+gameId)
            this.gameDetail=res.data
            console.log("活动详情",res)
        },
        onClickLeft(){
            this.$router.back()
        }
    },
    created(){
        let gameId=this.$route.query.gameId
        this.getGameDetail(gameId)
    }
}
</script>

<style lang="less">
.gamedetail{
  position: relative;
  padding: 30px;
  height: 100vh;
  background-color: #eee;
    //详情信息
    & .message{
      box-sizing: border-box;
      padding: 10px 0 0 35px;
      font-size: 30px;
      width: 690px;
      text-align: left;
      background-color:white;
      margin-bottom: 20px;
      border-radius: 30px;
      margin-bottom: 15px;
      & p{
          margin-bottom: 20px;
      }
    }
    & .des{
        box-sizing: border-box;
        padding: 10px 0 0 35px;
        font-size: 30px;
        width: 690px;
        text-align: left;
        background-color: white;
        margin-bottom: 20px;
        border-radius: 30px;
        & p{
          margin-bottom: 20px;
        }
    }
    //顶部
    & .van-nav-bar{
      background-color: #3298ed;
      .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left,.van-icon{
          color:white;
      }
    }
    //顶部占位
    & .seat_game_detail_top{
      height: 92px;
    }
    & .newJoinButton{
      position: fixed;
      line-height: 100px;
      border-radius: 50px;
      bottom: 30px;
      right: 30px;
      width: 690px;
      height: 100px;
      background-color: #3298ed;
      color:white;
      font-size: 38px;
    }
    & .oldJoinButton{
      position: fixed;
      line-height: 100px;
      border-radius: 50px;
      bottom: 30px;
      right: 30px;
      width: 690px;
      height: 100px;
      background-color: #ccc;
      color:white;
      font-size: 38px;
    }
}
</style>
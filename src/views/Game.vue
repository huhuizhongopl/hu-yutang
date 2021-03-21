<template>
  <div class="game">
    <van-nav-bar
    title="我的活动"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft"
    >
    <template #right>
        <van-icon name="plus" size="18" @click="addGame"/>
    </template>
    </van-nav-bar>
    <div class="seat_game_top"></div>
      <div class="gameItem" v-for="game in gameList" :key="game.id" @click="goGameDetail(game.id)">
          <p>活动名称：{{game.title}}</p>
          <p>场馆名称：{{game.venue.name}}</p>
          <p>创建者：{{game.user.name}}</p>
          <p>创建时间:{{game.created_at}}</p>
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
          gameList:[]
      }
    },
    methods:{
        addGame(){
          this.$router.push('/creategame')
        },
        goGameDetail(gameId){
            this.$router.push({
              path:"/gamedetail",
              query:{gameId}
            })
        },
        async getGameList(){
          let res=await this.$http.get('/game/list')
          //console.log("活动列表",res)
          this.gameList=res.data
        },
        onClickLeft(){
            this.$router.back()
        }
    },
    created(){
        this.getGameList()
    }
}
</script>

<style lang="less" scope>
.game{
  padding: 30px;
  & .gameItem{
    box-sizing: border-box;
    padding: 10px 0 0 35px;
    font-size: 30px;
    width: 690px;
    height: 200px;
    text-align: left;
    background-color: #3298ed;
    margin-bottom: 20px;
    border-radius: 30px;
    color:white;
  }
  //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left,.van-icon{
            color:white;
        }
    }
    //顶部占位
    & .seat_game_top{
        height: 92px;
    }
}
</style>
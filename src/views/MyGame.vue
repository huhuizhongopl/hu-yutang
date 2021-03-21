<template>
<div class="game">
    <van-nav-bar
    title="活动列表"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft"
    >
    <template #right>
        <van-icon name="plus" size="18" @click="addGame"/>
    </template>
    </van-nav-bar>
    <div class="seat_my_game_top"></div>
    <van-tabs v-model="gameIndex" >
    <van-tab title="我参与的"/>
    <van-tab title="我发布的"/>
    </van-tabs>
    <div class="joinGame" v-if="gameIndex===0">
        <div class="selGame" v-for="item in joinGame" :key="item.id">
            <p>{{item.title}}</p>
            <p>{{item.datetime}}</p>
            <a href="#" @click="deleteJoinGame(item.id)">删除</a>
        </div>
    </div>
    <div class="createGame" v-if="gameIndex===1">
        <div class="selGame" v-for="item in createGame" :key="item.id">
            <p>{{item.title}}</p>
            <p>{{item.datetime}}</p>
            <a href="#" @click="goGameDetail(item.id)">详情</a>
        </div>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            gameIndex:0,
            joinGame:{},
            createGame:{}
        }
    },
    methods:{
        addGame(){
          this.$router.push('/creategame')
        },
        async deleteJoinGame(id){
            let res=await this.$http.get('/game/del',id)
        },
        goGameDetail(id){
            this.$router.push({
                path:"/gamedetail",
                query:{
                    'gameId':id
                }
            })
        },
        onClickLeft(){
            this.$router.back()
        },
        async getGame(){
            let res=await this.$http.get('/user/my_games')
            console.log("获得参与，创建的活动",res)
            this.joinGame=res.data.join_games
            this.createGame=res.data.create_games
        }
    },
    created(){
        this.getGame()
    }
}
</script>

<style lang="less" scope hu>
.game{
    & .selGame{
        position: relative;
        box-sizing: border-box;
        padding: 10px 30px 0 45px;
        font-size: 30px;
        width: 690px;
        text-align: left;
        background-color: #3298ed;
        margin: 10px 30px;
        border-radius: 50px;
        color:white;
        & a{
            position: absolute;
            top: 25%;
            right: 35px;
            float:right;
            color:#eee;
            text-decoration: none;
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
    & .seat_my_game_top{
        height: 92px;
    }
}
</style>
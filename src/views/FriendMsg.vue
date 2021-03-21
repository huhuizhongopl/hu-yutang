<template>
  <div class="msgs">
    <van-nav-bar title="朋友圈" @click-right="onClickRight" fixed>
    <template #right>
        <van-icon name="plus" size="18" />
    </template>
    </van-nav-bar>
    <div class="seat_msgs_top"></div>
    <div class="msgWrap">
        <div class="msgCard" v-for="item in msgs" :key="item.id">
            <div class="userIcon">
                <div class="userIconWrap"><img :src="item.user.icon" alt=""></div>  
            </div>
            <div class="contentWrap">
                <h3>{{item.user.name}}</h3>
                <p>{{item.message}}</p>
                <div class="imgWrap">
                    <img :src="img" alt="" v-for="(img,index) in item.imgs" :key="index">
                </div>
                <span>{{item.created_at | time}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            msgs:[],
            page:0
        }
    },
    methods:{
        onClickRight(){
            this.$router.push('/createmsg')
        }
    },
    async created(){
        let res=await this.$http.get('user/friend_msgs')
        this.msgs=res.data.data
        console.log(res.data.data)
    },
    filters:{
        time(val){
            let nowTime=new Date()
            nowTime=parseInt(nowTime.getTime())
            val= val.replace(new RegExp("-","gm"),"/");
            var oldTime= parseInt((new Date(val)).getTime());
            let dis=nowTime-oldTime
            //分钟
            let num=(dis/1000)/60
            //小时
            if(num>=60){
                num=num/60
                if(num>24){
                    num=num/24
                    return num+"天前"
                }else{
                    return num+"小时前"
                }
            }else{
                return num+"分钟前"
            }
        }
    }
}
</script>

<style lang="less" scope>
.msgs{
    & .msgWrap{
        box-sizing: border-box;
        padding-bottom: 100px;
        & .msgCard{
            display: flex;
            font-size: 30px;
            text-align:left;
            border-bottom: 3px #eee solid;
            & .userIcon{
                width: 130px;
                padding:15px;
                & .userIconWrap{
                    overflow: hidden;
                    border-radius: 15px;
                    float:right;
                    img{
                        width: 90px;
                        height: 90px;
                        vertical-align: middle;
                    }
                }
            }
            & .contentWrap{
                width: 660px;
                box-sizing: border-box;
                padding: 25px 25px 25px 0;
                h3{
                    color:darkblue;
                    margin-bottom: 15px;
                }
                p{
                    margin-bottom: 15px;
                }
                span{
                    color:#bbb9ba;
                    font-size: 25px;
                }
                & .imgWrap{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    width: 480px;
                    img{
                        width: 150px;
                        height: 150px;
                        vertical-align: middle;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
            }
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
    & .seat_msgs_top{
        height: 92px;
    }
}
</style>
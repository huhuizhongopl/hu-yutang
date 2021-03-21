<template>
<div class="detail_wrap">
    <van-nav-bar
    :title="detail.name"
    left-text="返回"
    right-text=""
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_detail_top"></div>
    <div class="detail_header">
        <div class="detail_top">
            <div class="detail_img"><img :src="detail.cover_url" alt=""></div>
            <div class="detail_text">
                <h3>{{detail.name}}</h3>
                <p>{{detail.address}}</p>
                <p>营业时间：09:00~22:00</p>
            </div>
        </div>
        <div class="detail_bottom">
            <p>{{detail.phone}}</p>
            <van-icon name="phone-o" size="25" color="#3298ed" />
        </div>
    </div>
    <div class="date">
        <div class="date_title">
            <div class="date_title_item">{{detail.type_name}}</div>
        </div>
        <div class="date_content_wrap">
            <!-- 滑动区域 -->
            <div class="date_content">
                <div class="date_content_item" v-for="(item,index) in detail.date_weeks" :key="index" @click="goOrder(index)">
                    <p>{{item.week}}</p>
                    <p>{{item.date | date }}</p>
                    <p>充足</p>
                </div>
            </div>
        </div>
    </div>
    <div class="venues_build"></div>
    <van-cell title="交通方式" is-link />
    <van-cell title="场馆介绍" is-link />
</div>
</template>

<script>
export default{
    data(){
        return{
            detail:{}
        }
    },
    async mounted(){
        let res=await this.$http.get('/venue/detail/'+this.$route.query.id)
        this.detail=res.data
        console.log("场馆详情",res.data)
    },
    methods:{
        goOrder(index){
            let {times,date_sn_time_prices,date_weeks,name,id}=this.detail
            this.$router.push({
                name:"order",
                params:{index,times,date_sn_time_prices,date_weeks,name,id}
            })
        },
        onClickLeft(){
            this.$router.back()
        }
    },
    created(){
        
    },
    filters:{
        date(value){
            let date=value.substring(5,10)
            return date
        }
    }
}
</script>

<style lang="less" scope>
.detail_wrap{
    background-color: #f8f8f8;
    height: 100vh;
}
.venues_build{
    height: 270px;
    width: 750px;
    margin-bottom: 30px;
    background-color: white;
}
.van-cell{
    text-align: left;
}
//日期
.date{
    width: 750px;
    height: 320px;
    font-size: 30px;
    .date_title{
        width: 750px;
        height: 80px;
        box-sizing: border-box;
        border-top: 3px #ececec solid;
        border-bottom:3px #ececec solid;
        background-color: white;
        .date_title_item{
            width: 166px;
            height: 80px;
            float: left;
            text-align: center;
            line-height: 80px;
            color:#62a9e7;
            box-sizing: border-box;
            border-bottom:5px #62a9e7 solid;
        }
    }
    .date_content_wrap{
        width: 750px;
        overflow: auto;
        .date_content{
            width: 1350px;
            height: 240px;
            box-sizing: border-box;
            border-bottom:3px #ececec solid;
            background-color: #f8f8f8;
            padding: 0 30px;
            .date_content_item{
                width: 150px;
                height: 170px;
                box-sizing: border-box;
                border:3px #c8c8c8 solid;
                float: left;
                margin-top: 35px;
                margin-right: 30px;
                background-color: #fff;
                border-radius: 5px;
                p{
                    margin-bottom: 15px;
                }
                & p:nth-child(3){
                    color:#9cc358;
                }
            }
        }
    }
}
//顶部
.van-nav-bar{
    background-color: #3298ed;
    .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
        color:white;
    }
}
//顶部占位
.seat_detail_top{
    height: 66px;
}
//头部
.detail_header{
    width: 750px;
    height: 360px;
    margin-bottom: 30px;
    background-color: white;
    .detail_top{
        width: 750px;
        height: 250px;
        box-sizing: border-box;
        border-bottom:3px #ececec solid;
        .detail_img{
            width: 250px;
            height: 250px;
            float: left;
            img{
                width: 200px;
                height: 150px;
                vertical-align: middle;
                margin: 50px auto;
            }
        }
        .detail_text{
            width: 500px;
            height: 250px;
            font-size: 30px;
            overflow: hidden;
            float: left;
            text-align: left;
            h3{
                margin-top: 40px;
                margin-bottom: 20px;
            }
            p{
                margin-bottom: 20px;
            }
        }
    }
    .detail_bottom{
        width: 750px;
        height: 110px;
        box-sizing: border-box;
        border-bottom:3px #ececec solid;
        padding: 0 30px;
        font-size: 30px;
        line-height: 110px;
        overflow: hidden;
        p{
            text-align: left;
            float: left;
        }
        .van-icon{
            float:right;
            margin-top: 15px;
        }
    }
}
</style>
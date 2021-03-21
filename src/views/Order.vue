<template>
<div class="order">
    <van-nav-bar
    :title="venuesName"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_order_top"></div>
    <van-tabs v-model="titleIndex" @change="changeTab">
        <van-tab  v-for="(item,index) in date_weeks" :key="index">
            <div slot="title">
                <p>{{item.date | date}}</p>
                <p>{{item.week}}</p>
            </div>
        </van-tab>
    </van-tabs>
    <div class="vote">
        <div class="time_price" v-for="(sn_time_prices,date,index) in date_sn_time_prices" :key="index" v-show="index===titleIndex">
            <div class="times">
                <ul>
                    <li v-for="(item,index) in times" :key="index">{{item===8?"时间场地":item+":00"}}</li>
                </ul>
            </div>
            <div class="prices" >
                <dl v-for="(time_price,sn,idx) in sn_time_prices" :key="idx">
                    <dt>{{sn}}号场</dt>
                    <template v-for="(prices,time,i) in time_price" >
                        <dd :key="i" class="ordered" v-if="prices.is_ordered"></dd>
                        <dd :key="i" @click="select($event,sn,time,prices.price)" v-else>￥{{prices.price}}</dd>
                    </template>
                    
                </dl>
            </div>
        </div>
    </div>
    <div class="stage">
        <div class="card" v-for="(item,index) in form.items" :key="index">
            <div class="card_title">{{item.time}}:00-{{parseInt(item.time)+1}}:00</div>
            <div class="card_content">{{item.sn}}号场</div>
        </div>
    </div>
    <div class="footer">
        <p>合计：￥{{totalPrice}}</p>
        <div class="confirm" @click="saveOrder">确认预定</div>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            venuesName:"",
            titleIndex:1,
            date_weeks:[],
            date_sn_time_prices:{},
            times:{},
            form:{
                items:[],
                veneu_id:0,
                order_date:''
            },
            totalPrice:0
        }
    },
    methods:{
        //保存订单
        async saveOrder(){
            let res=await this.$http.post('/order/save',this.form)
            console.log(res)
            if(res.data.code===200){
                this.$toast(res.data.msg)
            }else{
                this.$toast(res.data.msg)
            }
            //this.form.items=[]
        },
        //切换选项卡
        changeTab(titleIndex){
          this.form.order_date = this.date_weeks[titleIndex].date;
        },
        //选票功能
        select(e,sn,time,price){
            let ele=e.target 
            if(ele.className==="selected"){
                ele.className=""
                this.form.items.forEach((item,index)=>{
                    if(item.sn===sn && item.time===time){
                        this.form.items.splice(index,1)
                        this.totalPrice-=price
                    }
                })
            }else{
                if(this.form.items.length>=4){
                    return this.$toast("最多选四个")
                }else{
                    ele.className="selected"
                    this.form.items.push({sn,time})
                    this.totalPrice+=price
                }
            }
            //console.log("form.items",this.form.items)
        },
        onClickLeft() {
            this.$router.back()
        }
    },
   
   created(){
        let {index,times,date_sn_time_prices,date_weeks,name,id}=this.$route.params
        this.form.order_date=date_weeks[index].date
        this.form.venue_id=id
        this.venuesName=name
        this.date_weeks=date_weeks
        this.titleIndex=index
        this.date_sn_time_prices=date_sn_time_prices
        this.times=times
        this.times.unshift(8)
        console.log("date_sn_time_prices",date_sn_time_prices)
    },

    filters:{
        date(value){
            let arr=value.split('-')
            let date=arr[1]+"月"+arr[2]+"日"
            return date
        }
    }
}
</script>

<style lang="less" scope>
.order{
    //展示卡片
    & .stage{
        width: 750px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 20px;
        & .card{
            width: 150px;
            height: 150px;
            box-sizing: border-box;
            border:1px #3298ed solid;
            border-radius: 5px;
            background-color: white;
            margin-right: 10px;
            & .card_title{
                width: 100%;
                height: 50px;
                line-height: 50px;
                background-color: #3298ed;
                color:white;
            }
            & .card_content{
                width: 100%;
                height: 100px;
                line-height: 100px;
                color:#3298ed;
            }
        }
    }
    //底部
    & .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 750px;
        height: 100px;
        line-height: 100px;
        font-size: 30px;
        border-top: 1px #e7e6eb solid;
        background-color: #fff;
        & p{
            float: left;
            margin-left: 30px;
            color:#f6ac61;
        }
        & .confirm{
            width: 240px;
            height: 100px;
            background-color:  #3298ed;
            float:right;
            text-align: center;
            line-height: 100px;
            color:white;
        }
    }
    //选票窗口外层容器
    & .vote{
        width: 750px;
        height: 850px;
        overflow: auto;    
    }
    //选票窗口
    & .time_price{
        display: flex;
        line-height: 100px;
        //padding-bottom: 100px;
        & .times{
            width: 125px;
            & ul{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                & li{
                    width: 125px;
                    height: 100px;
                    font-size: 5px;
                    box-sizing: border-box;
                }
            }
        }
        & .prices{
            width: 625px;
            display: flex;
            font-size: 5px;
            border-left: 1px #e7e6eb solid;
            box-sizing: border-box;
            & dl{
                display: flex;
                width: 124px;
                flex-direction: column;
                & dt,dd{
                    width: 124px;
                    height: 100px;
                    border-right: 1px #e7e6eb solid;
                    border-bottom:1px #e7e6eb solid;
                    box-sizing: border-box;
                }
                & .selected{
                    background-color: #3298ed;
                    color:white;
                }
                & .ordered{
                    background-color: #eee;
                }
            }
        }
    }
    //日期选项卡
    & .van-tabs{
        border-bottom: 2px #f1f0f5 solid;
        & .van-tab{
            width: 100px;
            height: 45px;
            font-size: 5px;
            &--active{
                color: #3298ed;
            }
        }
    }
    //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        & .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
            color:white;
        }
    }
    //顶部占位
    & .seat_order_top{
        height: 92px;
    }
}

</style>
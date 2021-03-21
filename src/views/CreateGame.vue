<template>
<div class="create_game">
    <van-nav-bar
    title="新建活动"
    left-text="返回"
    right-text=""
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_create_game_top"></div>
    <div class="main">
        <van-field v-model="game.title" label="活动标题" placeholder="请输入活动标题"/>
        <van-cell title="活动项目" is-link :value="type" @click="showType=true" />
        <van-action-sheet
        v-model="showType"
        :actions="typeArr"
        cancel-text="取消"
        close-on-click-action
        @select="onSelectType"
        />
        <van-cell title="活动场馆" is-link :value="venueName" @click="showVenue=true;selVenue()" />
        <van-cell title="活动时间" is-link :value="game.datetime" @click="showDateTime=true"/>
        <van-popup v-model="showDateTime" round position="bottom" :style="{ height: '30%' }" >
            <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择活动时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirmDatetime"
            @cancel="cancel"
            />
        </van-popup>
        <van-cell title="活动人数" >
            <template slot="default">
                <van-stepper v-model="game.number" integer />
            </template>
        </van-cell>
        <van-cell title="活动描述" />
        <van-field v-model="game.des" autosize type="textarea" rows="1" placeholder="请输入活动描述"/>
        <div class="button"><van-button type="primary" @click="saveGame">保存活动</van-button></div>
        
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            game:{
                title:"",
                type_id:0,
                datetime:"选择时间",
                des:"",
                number:0,
                venue_id:0
            },
            showType:false,
            typeArr:[],
            type:"选择项目",
            venueName:"选择场馆",
            showDateTime:false,
            minDate: new Date(),
            maxDate: new Date(2022,0,0),
            currentDate:new Date(2021,0,0)
        }
    },
    methods:{
        cancel(){
            this.showDateTime = false;
        },
        confirmDatetime(d){
            //将选定的时间进行转换
            let formateDate = d.getFullYear()+'-'+(d.getMonth()+1) +'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes();
            this.game.datetime = formateDate;
            this.showDateTime = false;
        },
        async saveGame(){
            let res=await this.$http.post('/game/save',this.game)
            console.log(res)
            if(res.status===200){
                this.$toast("保存活动成功")
            }else{
                this.$toast("保存活动失败")
            }
        },
        selVenue(){
            if(!this.game.type_id) return this.$toast("请先选择项目")
            this.$router.push({
                name:"selvenue",
                params:{
                    type_id:this.game.type_id
                }
            })
        },
        onSelectType(item){
            this.type=item.name
            this.game.type_id=item.id
        },
        onClickLeft(){
            this.$router.back()
        },
        async getVenue(type_id){
            let res=await this.$http.get('/venue/list',{params:{type_id}})
            this.venueArr=res.data.data
        },
        async getType(){
            let res =await this.$http.get('/venue/types')
            //console.log(res.data)
            res.data.forEach((item)=>{
                this.typeArr.push(item)
            })
        }
    },
    //组件路由钩子函数
    beforeRouteEnter(to,from,next){
        if(from.name==="selvenue"){
            next(vm=>{
                //用vm代替this
                //console.log(vm) 
                let venue = vm.$route.params.venue
                vm.venueName=venue.name
                vm.game.venue_id=venue.id
            })
        }
        next()
    },
    created(){
        this.getType()
        //组件缓存后created函数不被触发,所以要用beforeRouteEnter函数
        // let venue=this.$route.params.venue
        // if(venue){
        //     this.venue=venue.name
        //     this.game.venue_id=venue.id
        // }
        
    }
}
</script>

<style lang="less" scope>
.create_game{
    //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
            color:white;
        }
    }
    //顶部占位
    & .seat_create_game_top{
        height: 92px;
    }
    & .main{
        text-align: left;
        & .button{
            text-align: center;
        }
    }
}
</style>
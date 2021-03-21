<template>
<div class="home">
    <div class="header">
         <van-search
        v-model="words"
        shape="round"
        background="#3298ed"
        placeholder="请输入搜索关键词"
        @focus="search"
        />
        <van-dropdown-menu>
        <van-dropdown-item v-model="typesId" :options="types" @change="itemChange" />
        <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
    </div>
    <div class="seatHome"></div>
    <Venues :venues="venues" />
    <van-loading type="spinner" color="#3399ee" v-if="loading" />
    <div class="seatHomeBottom"></div>
</div>
</template>

<script>
import Venues from '../components/venues'
export default{
    components:{
        Venues
    },
    data(){
        return{
            venues:[],
            words:"",
            page:1,
            loading:false,
            finished:false,
            types:[],
            typesId: 0,
            value2: 'a',
            option2: [
                { text: '距离排序', value: 'a' },
                { text: '热度排序', value: 'b' },
                { text: '好评排序', value: 'c' },
            ],
        }
    },
    mounted(){
        document.addEventListener('scroll',this.scroll);
    },
    methods:{
        search(){
            this.$router.push('/search')
        },
        //获取场馆
        async getVenues(typeId){
            this.loading=true
            let res=await this.$http.get('/venue/list?page='+this.page,{params:{'type_id':typeId}})
            console.log(222)
            console.log("请求回的场馆数据",res)
            if(this.page >= res.data.last_page){
                this.finished=true
                console.log("到达最后一页")
            }
            if(this.page ===1){
                this.venues=res.data.data 
            }else{
                this.venues=this.venues.concat(res.data.data)   
            }
            this.loading=false
        },
        //场馆种类切换
        itemChange(typeId){
            if(typeId){
                this.page=1
                this.venues=[]
                this.loading=false
                this.finished=false
            }
            this.getVenues(typeId)
        },
        //加载更多
        loadMore(){

            if(this.loading || this.finished) return false;
            this.page+=1
            this.getVenues(this.typesId)
            console.log("下拉刷新","第"+this.page+"页")
                
        },
        //滚动刷新
        scroll(){
            let html =document.documentElement;
            let scrollH=html.scrollHeight;
            let clientH=html.clientHeight;
            let dis=scrollH-clientH;
            let scrollTop=html.scrollTop;
            if(scrollTop>(dis-10)){
                this.loadMore()
            }
        },
        //获取种类
        async getType(){
            let res=await this.$http.get('/venue/types')
            //console.log("请求回的种类",res.data)
            this.types=res.data.map((item)=>{
                return {text:item.name,value:item.id}
            })
            this.types.unshift({text:"全部",value:0})
        }
    },
    created(){
      this.getVenues()
      this.getType()
    },
    beforeDestroy(){
        document.removeEventListener('scroll',this.scroll);
    }
}
</script>

<style lang="less" scope>
.home{
    position: relative;
    & .header{
        width: 750px;
        height: 200px;
        position: fixed;
        top: 0;
        left: 0;
    }
    & .seatHome{
        height:200px;
    }
    & .seatHomeBottom{
        height: 150px;
    }
}

</style>
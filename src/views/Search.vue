<template>
<div>
    <div class="header">
         <van-search
         ref="searchBox"
        v-model="words"
        shape="round"
        background="#3298ed"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        />
    </div>
    <div class="seatSearch"></div>
    <Venues :venues="venues" />
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
            words:"",
            venues:[],
            wordsHistory:[]
        }
    },
    mounted(){
        this.$refs.searchBox.getElementsByTagName("input")[0].focus();
    },
    methods:{
        onSearch(value){
            this.words=value
            this.getVenues()
            this.wordsHistory.push(this.word)
            localStorage.setItem("wordsHistory",this.wordsHistory)
        },
        async getVenues(){
            let res =await this.$http.post('/venue/search?words='+this.words)
            this.venues=res.data.data
            //console.log(res.data.data)
        },
        onCancel(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scope>
.header{
    width: 750px;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    .van-search__action{
        color:white;
    }
}
.seatSearch{
    height:100px;
}
</style>
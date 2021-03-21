<template>
<div>
    <div class="venuesWrap">
        <div class="venues" v-for="item in venues" :key="item.id" @click="goDetail(item.id)">
            <div class="img"><img :src="item.cover_url" alt=""></div>
            <div class="text">
                <h3>{{item.name}}</h3>
                <p>{{item.address}}</p>
                <p>{{item.created_at}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    props:['venues'],
    methods:{
        goDetail(id){
            this.$router.push({
                path:"/detail",
                query:{id:id}
            })
        }
    }
}
</script>

<style lang="less" scope>
.venues{
    width:750px;
    height:270px;
    box-sizing: border-box;
    border-bottom:3px #eff0f4 solid;
    .img{
        float:left;
        width:270px;
        height:270px;
        img{
            width:190px;
            height:160px;
            margin: 55px  auto ;
        }
    }
    .text{
        width:480px;
        height:270px;
        float:left;
        text-align: left;
        font-size:30px;
        overflow: hidden;
        h3{
            margin-top: 45px;
            margin-bottom: 25px;
        }
        p{
            margin-bottom: 25px;
        }
    }
}
</style>
<template>
  <div class="sel_venue">
    <van-nav-bar
    title="选择场馆"
    left-text="返回"
    right-text=""
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_sel_venue_top"></div>
    <div class="main">
        <van-address-list
          v-model="chosenAddressId"
          :list="venueList"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            chosenAddressId:0,
            venueList:[],
            selVenue:null
        }
    },
    methods:{
      onClickLeft(){
            this.$router.back()
      },
      async onAdd() {
        if(!this.selVenue) return this.$toast("请先选择场馆")
        this.$router.push({
          name:"creategame",
          params:{
            venue:this.selVenue
          }
        })
      },
      onEdit() {
        
      },
      onSelect(venue){
        this.selVenue=venue
      }
    },
    async created(){
        let type_id=this.$route.params.type_id
        await this.$http.get('/venue/list',{params:{type_id}}).then(res=>{
            this.venueList=res.data.data
        })
        if(this.venueList){
          this.chosenAddressId=this.venueList[0].id
          this.selVenue=this.venueList[0]
        }
        
    }
}
</script>

<style lang="less" scope>
.sel_venue{
  //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
            color:white;
        }
    }
    //顶部占位
    & .seat_sel_venue_top{
        height: 92px;
    }
}
</style>
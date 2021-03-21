<template>
  <div class="createMsg">
    <van-nav-bar  @click-right="saveMsg" left-text="取消" @click-left="onClickLeft">
    <template #right>
        <van-button type="primary" size="small">发表</van-button>
    </template>
    </van-nav-bar>
    <div class="seat_createMsg_top"></div>
    <van-field
    v-model="message"
    rows="1"
    autosize
    type="textarea"
    placeholder="这一刻的想法"
    />
    <van-uploader :after-read="afterRead" v-model="fileList" multiple/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            message:"",
            fileList:[],
            formData:new FormData()
        }
    },
    methods:{
        // 此时可以自行将文件上传至服务器
        afterRead(file) {
            console.log(file);
            // 判断变量是对象还是数组; 
            if(file.constructor === Object){
                this.formData.append('myfile[]',file.file)   
            }else{
                file.forEach(item=>{
                    this.formData.append('myfile[]',item.file)
                })
            }
        },
        //保存朋友圈
        async saveMsg(){
            this.formData.append("message",this.message)
            let res=await this.$http.post('user/send_friend_msg',this.formData)
            console.log(res)
            if(res.status===200){
                this.$toast('上传朋友圈成功')
            }else{
                this.$toast('上传朋友圈失败')
            }
            this.message=""
            this.fileList=[]
        },
        onClickLeft(){
            this.$router.push('/friendmsg')
        }
    },
    created(){

    }
}
</script>

<style lang="less" scope>
.createMsg{
    & .van-nav-bar{
        background-color: white;
    }
    & .van-nav-bar__text{
        color:black;
    }
    //顶部占位
    & .seat_createMsg_top{
        height: 92px;
    }
}
</style>
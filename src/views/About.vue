<template>
<div class="about">
    <div class="header">
        <div class="iconWrap">
            <img :src="user.icon" alt="" @click="clickUpload">
            <input type="file" @change="upload" class="upload" ref="upload">
        </div>    
        <p>{{user.name}}</p>
    </div>
    <van-cell title="我的订单" is-link />
    <van-cell title="我的活动" is-link to="/mygame"/>
    <van-cell title="我的场馆" is-link />
    <van-cell title="意见反馈" is-link />
    <van-cell title="退出登录" is-link @click="logout"/>
</div>
</template>

<script>
export default{
    data(){
        return{
            user:{
                icon:require('../assets/user_icon/girl.jpg'),
                name:""
            }
        }
    },
    methods:{
        clickUpload(){
            this.$refs.upload.click()
        },
        async upload(e){
            //console.log(e)
            let pic =e.target.files[0]
            let form =new FormData()
            form.append("icon",pic)
            let res =await this.$http.post('/user/upload',form)
            this.user=res.data.user
            console.log("上传头像",res)
            if(res.status===200){
                this.$toast(res.data.msg)
            }else{
                this.$toast("上传文件失败")
            }
            let user=JSON.stringify(this.user)
            sessionStorage.setItem("user",user)
        },
        logout(){
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
            this.$router.push("/login")
            this.$toast("退出登录成功")
        },
        created(){
            this.user=JSON.parse(sessionStorage.getItem("user"))
            console.log("user",this.user)
        }
    }
}
</script>

<style lang="less" scope>
.about{
    & .header{
        width: 750px;
        height: 350px;
        background-color: #3298ed;
        overflow: hidden;
        color:white;
        & .iconWrap{
            overflow: hidden;
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin: 80px auto 0;
            img{
                width: 150px;
                height: 150px;
            }
        }
    }
    & .van-cell{
        text-align: left;
    }
}
</style>
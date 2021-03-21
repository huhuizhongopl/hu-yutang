<template>
<div class="login">
    <van-nav-bar
    title="注册"
    left-text="返回"
    right-text=""
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_login_top"></div>
    <div class="main">
        <van-cell-group>
        <van-field 
        required
        v-model="user.email" 
        type="email" 
        label="邮箱"
        @blur="checkEmail"
        :error-message="msg.email"
        />
        </van-cell-group>
        <van-field 
        required
        v-model="user.password" 
        type="password" 
        label="密码" 
        />
    </div>
    <van-button type="info" size="large" @click="login">登录</van-button>
</div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                email:"",
                password:""
            },
            msg:{
                email:""
            }
        }
    },
    methods:{
        async login(){
            let res=await this.$http.post('/user/login',this.user)
            console.log(res)
            if(res.data.code!==200){
                this.$toast(res.data.msg)
            }else{
                sessionStorage.setItem("token",res.data.user.api_token)
                sessionStorage.setItem("user",JSON.stringify(res.data.user))
                this.$toast(res.data.msg)
                this.$router.push("/")
            }
        },
        onClickLeft(){
            this.$router.back()
        },
        checkEmail(){
            let EMAIL_REGEXP = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!EMAIL_REGEXP.test(this.user.email)){
                this.msg.email = '邮箱格式有误!';
                this.bool=false;
            }else{
                this.msg.email = ''
                this.bool=true
            }
        }
    },
    async created(){
        this.user.email=this.$route.params.email
    }
}
</script>

<style lang="less" scope>
.login{
    
    //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
            color:white;
        }
    }
    //顶部占位
    & .seat_login_top{
        height: 92px;
    }
    & .van-button{
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>
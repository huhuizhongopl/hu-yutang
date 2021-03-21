<template>
<div class="register">
    <van-nav-bar
    title="注册"
    left-text="返回"
    right-text=""
    left-arrow
    fixed
    @click-left="onClickLeft"
    />
    <div class="seat_register_top"></div>
    <div class="main">
        <van-cell-group>
        <van-field
            v-model="user.name"
            required
            label="用户名"
            placeholder="请输入用户名"
            :error-message="msg.name"
            @blur="checkName"
        />
        <van-field
            v-model="user.tel"
            required
            label="手机号"
            placeholder="请输入手机号"
            :error-message="msg.tel"
            @blur="checkTel"
        />
        <van-field 
            required
            v-model="user.password" 
            type="password" 
            label="密码" 
        />
        <van-field 
            required
            v-model="user.email" 
            type="email" 
            label="邮箱"
            @blur="checkEmail"
            :error-message="msg.email"
        />
        </van-cell-group>
    </div>
    <van-button type="info" size="large" @click="reg">注册</van-button>
</div>
</template>

<script>
export default{
    data(){
        return{
            user:{
                name:"",
                tel:"",
                password:"",
                email:""
            },
            msg:{
                tel:"",
                name:"",
                email:""
            },
            bool:true
        }
    },
    methods:{
        async reg(){
            if(!this.bool) return this.$toast('请填写正确信息')
            let res=await this.$http.post('/user/reg',this.user)
            console.log(res)
            if(res.data.code!==200){
                this.$toast('注册失败')
            }else{
                this.$toast(res.data.msg)
                this.$router.push({
                    name:"login",
                    params:{
                        email:this.user.email
                    }
                })
            }
        },
        checkName(){
            if(this.user.name===""){
                this.msg.name="请输入用户名!";
                this.bool = false;
            }else{
                this.msg.name="";
                this.bool=true
            }
        },
        checkTel(){
            let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if(!TEL_REGEXP.test(this.user.tel)){
                this.msg.tel = '手机格式有误!';
                this.bool=false;
            }else{
                this.msg.tel = ''
                this.bool=true
            }
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
        },
        onClickLeft(){
            this.$router.back()
        }
    },
    created(){
        
    }
}
</script>

<style lang="less" scope>
.register{
    
    //顶部
    & .van-nav-bar{
        background-color: #3298ed;
        .van-nav-bar__title,.van-nav-bar__text,.van-icon-arrow-left{
            color:white;
        }
    }
    //顶部占位
    & .seat_register_top{
        height: 92px;
    }
    & .van-button{
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>
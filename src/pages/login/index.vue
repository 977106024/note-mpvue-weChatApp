<template>
    <div id="login">
        <div>
            <img src="/static/images/my3.png" alt="">
        </div>
        <button type='primary' @click="login">一键登录</button>
    </div>
</template>

<script>
export default {
    data:()=>({

    }),
    methods: {
        login(){
            wx.login({
      success: res => {
        if (res.code) {
          const data = {
            code: res.code
          };
          this.$http
            .get("http://api.xuewuzhijing.top:2333/weChatApp/login",data)
            .then(res => {
              let $res = res.data
              wx.setStorage({
                key:'TOKEN',
                data:$res.data.token
              })
              wx.navigateBack({
                delta:1
              })
            });
        }
      }
    });
        }
    },
}
</script>


<style lang="scss" scoped>
    #login{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 120px;
        img{
            height: 80px;
            width:80px;
        }
        button{
            height: 50px;
            width: 120px;
        }
    }
</style>

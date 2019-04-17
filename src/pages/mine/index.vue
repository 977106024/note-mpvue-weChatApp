<template>
  <div id="mine">
    <div class="user">
      <open-data type="userAvatarUrl" class="avatar"></open-data>
      <open-data type="userNickName" class="name"></open-data>
    </div>
    <div class="line"></div>
    <div class="column">
      <ul>
        <li>
          <p>记事</p>5
        </li>
        <li>
          <p>分类</p>x
        </li>
        <li>
          <p>待办</p>x
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  created() {
  
  },
  mounted() {
    
  },
  onShow(){
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
            });
        }
      }
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#mine {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .user {
    padding-bottom: 20px;
    text-align: center;
    .avatar {
      display: block;
      height: 60px;
      width: 60px;
      padding: 5px;
    }
    .name {
      color: #ccc;
    }
  }
  .line {
    border-top: 1px solid #ccc;
    height: 1px;
    width: 98%;
  }
  .column {
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      li {
        width: 50%;
        padding: 8px 15px;
        p {
          display: inline-block;
          padding-right: 40px;
        }
        &::after {
          content: "";
          display: block;
          height: 1px;
          width: 90%;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
</style>


<template>
  <div id="detail">
    <header>
      <p>{{time}}</p>
      <icon bindtap="editNote" type="success_no_circle" size="20" color="black" @click="save" v-if="isShow" />
      <img src="/static/images/tag.png" alt="" v-else>
    </header>
    <section id="edit">
      <textarea name id cols="30" rows="10" v-model="content" @focus="isShow = true"></textarea>
    </section>
    <footer>
      <img src="/static/images/remove.png" alt="" @click="remove">
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: "",
    time: "",
    content: "",
    firstContent:"",
    isShow:false,
  }),
  mounted() {
    const query = this.$root.$mp.query;
    this.time = query.time;
    this.content = query.content;
    this.firstContent = query.content
    this.id = query.id;
  },
  methods: {
    save() {
      if(this.content == this.firstContent){
        wx.navigateBack({
          url:"../index/main"
        })
        return
      }
      this.$http
        .post("http://localhost:2333/weChatApp/editNote", {
          content: this.content,
          id: this.id
        })
        .then(res => {});
    },
    //确定删除
    remove() {
      wx.showModal({
        title: "删除",
        content: "确认删除？",
        success:res=> {
          if (res.confirm) {
            this.$http
              .post("http://localhost:2333/weChatApp/removeNote", {
                id: this.id
              })
              .then(res => {
                console.log(res);
              });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#detail{
    padding: 0 20px;
}
header {
  display: flex;
  justify-content: space-between;
  img {
    height: 30px;
    width: 30px;
  }
}
footer {
  position: fixed;
  bottom: 15px;
  right: 15px;
      img{
          height: 30px;
          width: 30px;
      }
}
</style>

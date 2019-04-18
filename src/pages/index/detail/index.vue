<template>
  <div>
    <header>
      <p>{{time}}</p>
      <button @click="save">保存</button>
    </header>
    <section id="edit">
      <textarea name id cols="30" rows="10" v-model="content"></textarea>
    </section>
    <footer>
      <button @click="remove">删除</button>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: "",
    time: "",
    content: ""
  }),
  mounted() {
    const query = this.$root.$mp.query;
    this.time = query.time;
    this.content = query.content;
    this.id = query.id;
  },
  methods: {
    save() {
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
header {
  display: flex;
  button {
    height: 30px;
    width: 30px;
  }
}
footer {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

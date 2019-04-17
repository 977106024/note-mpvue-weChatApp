<template>
  <div>
    <section id="note">
      <ul>
        <li v-for="(item,i) in notes" :key="i">
          <p>{{item.createdTime}}</p>
          <p>TIP:{{item.content}}</p>
        </li>
      </ul>
    </section>
    <footer>
      <button>录</button>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notes:""
    };
  },

  created() {
    
  },
  onShow(){
    this.$http
      .get("http://api.xuewuzhijing.top:2333/weChatApp/noteList")
      .then(res => {
        let $res = res.data
        if($res.code === 200){
          this.notes = $res.data.result;
          console.log(this.notes)
        }
      });
  },

  components: {},

  methods: {
    
  },

};
</script>

<style lang="scss" scoped>
#note {
  ul {
    padding: 50px 25px;
    li {
      // background: #e98d3f;
      border: 1px solid #ccc;
      padding: 5px 10px;
      margin-bottom: 15px;
      p {
        &:first-child {
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
footer {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  button {
    height: 60px;
    width: 60px;
    border-radius: 50px;
    border: none;
  }
}
</style>

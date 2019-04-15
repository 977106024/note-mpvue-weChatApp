<template>
  <div>
    <section id="note">
      <ul>
        <li v-for="(item,i) in [1,2,3]" :key="i">
          <p>2019/04/15</p>
          <p>TIP:欢迎使用语音便签</p>
        </li>
      </ul>
    </section>
    <footer>
      <button>录</button>
    </footer>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
  #note{
    ul{
      padding: 50px 25px;
      li{
        // background: #e98d3f;
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin-bottom: 15px;
        p{
          &:first-child{
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
  footer{
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    button{
      height: 60px;
      width: 60px;
      border-radius: 50px; 
      border: none;
    }
  }
</style>

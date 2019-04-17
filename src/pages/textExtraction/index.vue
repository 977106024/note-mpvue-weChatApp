<template>
  <div id="textExtraction">
    <section id="upImg">
      <div class="img">
        <img :src="img" alt="" v-if="isShow">
        <p v-else>请上传图片...</p>
      </div>
      <button @click="previewImg">上传图片</button>
    </section>
    <section id="result"><h3>提取结果：</h3>
      <div class="words">
        <p v-for="(item,index) in extractionText" :key="index">{{item.words}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";

export default {
  data() {
    return {
      img:'',
      isShow:false,
      extractionText:'',
    };
  },

  created() {},
  methods: {
      //点击选择图片
  previewImg() {
    let token = wx.getStorageSync('TOKEN')
    if(token){
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: res => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths

          this.img = tempFilePaths[0]
          this.isShow = true

          this.upImg(tempFilePaths[0])
         
        }
      })
    }else{
      //登陆
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  upImg(imgFile) {
    let token = wx.getStorageSync('TOKEN')
    const uploadTask = wx.uploadFile({
      url: 'http://localhost:2333/weChatApp/upImgFile',
      filePath: imgFile,
      name: 'imgfile',
      header: {
        "x-access-token": token
      },
      success: res => {
        let $res = JSON.parse(res.data)
        if($res.code ==200){
         this.extractionText = $res.data
        }
        if($res.code ==-200){
          wx.showToast({
            title: '没有识别出文字哦！',
            icon: 'none',
          })
        }
      }
    })
  },
  },
};
</script>

<style lang="scss" scoped>
  #textExtraction{
    font-size:16px;
    width:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    #upImg{
      width: 80%;
      div.img{
        height: 180px;
        border:1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 100%;
          height: 100%;
        }
      }
      button{
        font-size:16px;
        margin-top: 15px;
        width: 40%;
      }
    }
    #result{
      width: 80%;
      margin-top: 25px;
      .words{
        color: #999;
        padding-top: 5px;
        padding-left: 15px;
      }
    }
  }
</style>

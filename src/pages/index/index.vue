<template>
  <div>
    <section id="note">
      <ul>
        <li
          v-for="(item,i) in notes"
          :key="item._id"
          @click="detail(item.createdTime,item.content,item._id)"
        >
          <p>{{item.createdTime}}</p>
          <p>TIP:{{item.content}}</p>
        </li>
      </ul>
    </section>
    <footer>
      <button @touchstart="upRecorder" @touchend="endRecorder">录</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [
        {
          createdTime: parseInt(Date.now() / 1000),
          content: "欢迎使用语音便签",
          _id: 0
        },
        {
          createdTime: parseInt(Date.now() / 1000),
          content:
            "按下语音-------------------------------------------------------------------------------------------记录一切^_^",
          _id: 1
        }
      ],
      recorderManager: wx.getRecorderManager()
    };
  },

  created() {},
  onShow() {
    this.$http
      .get("http://api.xuewuzhijing.top:2333/weChatApp/noteList")
      .then(res => {
        let $res = res.data;
        if ($res.code === 200) {
          this.notes = $res.data.result;
          console.log(this.notes);
        }
      });
  },

  components: {},

  methods: {
    upRecorder() {
      let token = wx.getStorageSync("TOKEN");
      if (!token) {
        wx.navigateTo({
          url:'../login/main'
        })
      }
      //录音配置
      const options = {
        duration: 60000
      };
      // 开始录音
      this.recorderManager.start(options);
      this.recorderManager.onStart(() => {
        console.log("recorder start");
      });

      //错误
      this.recorderManager.onError(res => {
        console.log("error", res);
      });
    },
    endRecorder() {
      this.recorderManager.stop();
      this.recorderManager.onStop(res => {
        console.log("recorder stop");
        // tempFilePath 是录制的音频文件
        const { tempFilePath } = res;

        // 获取文件路径-提交到后台-后台发送到百度
        let token = wx.getStorageSync("TOKEN");
        if (token) {
          wx.uploadFile({
            url: "http://localhost:2333/weChatApp/uploadFile",
            filePath: tempFilePath,
            name: "recorder",
            header: {
              "x-access-token": token
            },
            success: res => {
              let $res = JSON.parse(res.data);
              if ($res.code === 200) {
                let result = $res.data.result;
                this.notes.push({
                  _id: result.content,
                  createdTime: result.createdTime
                });
              } else if ($res.code === -200) {
                wx.showToast({
                  title: "没有听清！",
                  icon: "none"
                });
              }
            }
          });
        }
      });
    },

    //跳转详情页
    detail(time, value, id) {
      console.log(4444);
      wx.navigateTo({
        url: `./detail/main?content=${value}&time=${time}&id=${id}`
      });
    }
  }
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
    border: 1px solid #f0f0f0;
    &:after {
      border: none;
    }
  }
}
</style>

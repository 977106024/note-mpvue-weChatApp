<template>
  <div id="textExtraction">
    <section id="upImg">
      <div>
        <p>请上传图片...</p>
      </div>
      <button>提取文字</button>
    </section>
    <section id="result"><h3>提取结果：</h3>
      <div>
        <p>这是结果</p>
      </div>
    </section>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";

export default {
  data() {
    return {
      logs: []
    };
  },

  created() {}
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
      div{
        height: 180px;
        border:1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
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
      div{
        padding-top: 5px;
        padding-left: 15px;
      }
    }
  }
</style>

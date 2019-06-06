<template>
  <div class="bodycontent">
    <Card :bordered="false" :padding="16">
      <p slot="title">用户名</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>dalao</p>
        </div>
      </div>
    </Card>

    <Card :bordered="false" :padding="16">
      <p slot="title">个人头像</p>
      <div style="display: flex;">
        <div class="cardcontent" style="height:70px; background-color: pink;width:500px">
          <img src alt="个人头像" style="background-color: gold;">
        </div>
        <div style="margin:auto">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button class="btn" type="primary" icon="ios-cloud-upload-outline">修改头像</Button>
          </Upload>
        </div>
      </div>
    </Card>

    <mycard :info="nickname"></mycard>
    <mycard :info="mail"></mycard>
    <mycard :info="info"></mycard>
  </div>
</template>


<script>
import mycard from "../components/UserInfoCard";
export default {
  components: {
    mycard
  },
  data() {
    return {
      info: {
        name: "手机号码",
        value: "12345679",
        do: "更改号码"
      },
      mail: {
        name: "邮箱地址",
        value: "132132131@qq.com",
        do: "修改地址"
      },
      nickname: {
        name: "昵称",
        value: "大佬",
        do: "修改昵称"
      },
      flag: false
    };
  },
  created(){
    this.axios({
      method:'get',
      url:'',
      params:{
    
      }
    }).then(res => {

    }).catch(err => {]
      
    })
  }
};
</script>


<style scoped>
.bodycontent {
  background-color: #fff;
}
.cardcontent {
  width: 150px;
  margin-left: 50px;
  line-height: 31.41px;
}
.btn {
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


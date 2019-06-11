<template>
  <div class="bodycontent">
    <Card :bordered="false" :padding="16" style="margin-top:2px">
      <p slot="title">用户名</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>{{userInfo.userName}}</p>
        </div>
      </div>
    </Card>

    <Card :bordered="false" :padding="16" style="margin-top:2px">
      <p slot="title">个人昵称</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>{{userInfo.nickName}}</p>
        </div>
        <div style="width: 300px; margin-left:50px; height:32px">
          <Input v-model="nickName" placeholder="输入要修改的昵称" style="width: 300px;"/>
        </div>
        <Poptip class="btn" confirm title="你确定修改吗？" @on-ok="updateNickname" @on-cancel="cancel">
          <Button type="primary">修改昵称</Button>
        </Poptip>
      </div>
    </Card>

    <Card :bordered="false" :padding="16" style="margin-top:2px">
      <p slot="title">个人头像</p>
      <div style="display: flex;">
        <div class="cardcontent" style="height:70px;width:500px">
          <img class="myicon" :src="userInfo.myicon" alt="个人头像" style="background-color: gold;">
        </div>
        <div style="margin:auto">
          <Upload action :before-upload="updatemyicon">
            <Button class="btn" type="primary" icon="ios-cloud-upload-outline">修改头像</Button>
          </Upload>
        </div>
      </div>
    </Card>

    <Card :bordered="false" :padding="16" style="margin-top:2px">
      <p slot="title">手机号码</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>{{userInfo.phoneNumber}}</p>
        </div>
        <div style="width: 300px; margin-left:50px; height:32px">
          <Input v-model="phoneNumber" placeholder="输入要修改的号码" style="width: 300px"/>
        </div>
        <Poptip class="btn" confirm title="你确定修改吗？" @on-ok="updatePhonenumber" @on-cancel="cancel">
          <Button type="primary">修改号码</Button>
        </Poptip>
      </div>
    </Card>

    <Card :bordered="false" :padding="16" style="margin-top:2px">
      <p slot="title">邮箱地址</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>{{userInfo.email}}</p>
        </div>
        <div style="width: 300px; margin-left:50px; height:32px">
          <Input v-model="email" placeholder="输入要修改邮箱地址" style="width: 300px"/>
        </div>
        <Poptip class="btn" confirm title="你确定修改吗？" @on-ok="updateEmail" @on-cancel="cancel">
          <Button type="primary">修改邮箱</Button>
        </Poptip>
      </div>
    </Card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userName: "",
      nickName: "",
      phoneNumber: "",
      email: "",
      myicon: "",
      userInfo: {
        userName: "",
        nickName: "",
        myicon: "",
        phoneNumber: "",
        email: ""
      }
    };
  },

  methods: {
    uploadChange() {
      var params = new FormData();
      params.append("nickName", this.userInfo.nickName);
      params.append("phone", this.userInfo.phoneNumber);
      params.append("email", this.userInfo.email);
      params.append("file", this.myicon);
      this.axios({
        method: "put",
        url: "http://192.168.43.138:9000/user/",
        headers: { "Content-Type": "multipart/form-data" },
        data: params
      }).then(res => {
        if (res.data == "success") {
          this.$Message.success("修改成功");
          this.$emit("close");
        }
      });
    },

    updateNickname() {
      this.userInfo.nickName = this.nickName;
      this.nickName = "";
      if (this.uploadChange()) {
        this.$Message.info("修改成功");
      }
    },
    updatePhonenumber() {
      this.userInfo.phoneNumber = this.phoneNumber;
      this.phoneNumber = "";
      if (this.uploadChange()) {
        this.$Message.info("修改成功");
      }
    },
    updateEmail() {
      this.userInfo.email = this.email;
      this.email = "";
      if (this.uploadChange()) {
        this.$Message.info("修改成功");
      }
    },
    updatemyicon(myicon) {
      console.log(myicon);
      this.myicon=myicon
      this.userInfo.myicon = this.myicon;
      if (this.uploadChange()) {
        this.$Message.info("修改成功");
      }

      // this.userInfo.myicon = `http://192.168.43.138:9000/${myicon.name}`;
    },
    cancel() {
      this.$Message.info("你取消了操作");
    }
  },

  created() {
    this.axios({
      method: "get",
      url: "http://192.168.43.138:9000/user/"
    })
      .then(res => {
        (this.userInfo.userName = res.data.userName),
          (this.userInfo.nickName = res.data.nickName),
          (this.userInfo.phoneNumber = res.data.phone),
          (this.userInfo.email = res.data.email),
          (this.userInfo.myicon = `http://192.168.43.138:9000/${
            res.data.image
          }`);
      })
      .catch(err => {
        [];
      });
  }
};
</script>


<style scoped>
.bodycontent {
  background-color: #fff;
  margin-left: 1px;
}
.cardcontent {
  width: 150px;
  margin-left: 50px;
  line-height: 31.41px;
}
.btn {
  margin: auto;
}
.myicon {
  height: 70px;
  width: 70px;
}
</style>


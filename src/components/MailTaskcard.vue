<template>
  <Row>
    <Col span="12" class="myeat">
      <P>我的快递</P>
      <MailTask
        v-for="item in mailTaskSelfList"
        :key="item.taskId"
        class="mytask"
        type="release"
        :status="item.status"
        :mailInfo="item"
      ></MailTask>
    </Col>
    <Col span="12" class="myget">
      <P>我的领取</P>
      <MailTask
        v-for="item in mailTaskSelfList"
        :key="item.taskId"
        class="mytask"
        type="order"
        :status="item.status"
        :mailInfo="item"
      ></MailTask>
    </Col>
  </Row>
</template>
<script>
import MailTask from "../components/MailTask";
import MailOrderModal from "../components/MailOrderModal";
import Comment from "../components/Comment";

import CONST from "../common/index";

export default {
  components: {
    MailTask,
    MailOrderModal,
    Comment
  },
  data() {
    return {
      mailTaskList: [],
      mailTaskSelfList: [],
      mailTaskOrderList: [],
      modalVisble: false,
      TabsValue: "wait",
      wirteVisble: false
      // mailList: CONST.mailTask,
    };
  },
  methods: {
    refresh() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/0"
      })
        .then(res => {
          this.mailTaskList = res.data.filter((item, index, array) => {
            return item.type == "express";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    refreshName() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/name"
      })
        .then(res => {
          this.mailTaskSelfList = res.data.filter((item, index, array) => {
            return (
              item.type == "express" &&
              item.pubUser == this.$store.state.userInfo.userName
            );
          });
          this.mailTaskOrderList = res.data.filter((item, index, array) => {
            return (
              item.type == "express" &&
              item.subUser == this.$store.state.userInfo.userName
            );
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    close() {
      this.modalVisble = false;
    },

    wirteComment() {
      this.TabsValue = "commit";
      this.wirteVisble = true;
    },
    changewirteVisble() {
      this.wirteVisble = false;
    }
  },
  created() {
    this.refresh();
    this.refreshName();
  }
};
</script>
<style scoped>
.all {
}
.content {
  background: white;
  min-height: 800px;
  width: 80%;
  margin: 30px auto;
}
.task {
  width: 70%;
  margin: 15px auto;
}
.FoodOrderModal {
  width: 50%;
  margin: 15px auto;
}
.addbutton {
  position: fixed;
  top: 100px;
  right: 50px;
}
.writebutton {
  position: fixed;
  top: 200px;
  right: 50px;
}
.refishbutton {
  position: fixed;
  top: 150px;
  right: 50px;
}
.myeat {
  border-right: 1px red solid;
}
.myeat p,
.myget p {
  text-align: center;
  width: 100%;
}

.no {
  width: 20%;
  margin: 100px 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>


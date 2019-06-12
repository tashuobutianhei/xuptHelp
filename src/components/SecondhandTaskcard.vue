<template>
  <Row>
    <Col span="12" class="myeat">
      <P>我的出售</P>
      <SecondHandTask
        v-for="item in handTaskSelfList"
        :key="item.taskId"
        :Info="item"
        class="task"
        type="release"
        :status="index"
        :rowStyle="1"
      ></SecondHandTask>
    </Col>
    <Col span="12" class="myget">
      <P>我的购买</P>
      <SecondHandTask
        v-for="item in handTaskOrderList"
        :key="item.taskId"
        :Info="item"
        class="task"
        type="order"
        :status="index"
        :rowStyle="1"
      ></SecondHandTask>
    </Col>
  </Row>
</template>
<script>
import SecondHandTask from "../components/SecondHandTask";
import MailTask from "../components/MailTask";
import MailOrderModal from "../components/MailOrderModal";
import Comment from "../components/Comment";
import SecondhandModal from "../components/SecondhandModal";

import CONST from "../common/index.js";

export default {
  components: {
    SecondHandTask,
    MailTask,
    MailOrderModal,
    Comment,
    SecondhandModal
  },
  data() {
    return {
      handTaskList: [], //待领取
      handTaskSelfList: [], //发布
      handTaskOrderList: [], //领取

      // List: CONST.secondHandTask.secondHandTaskList,
      modalVisble: false,
      TabsValue: "wait",
      wirteVisble: false
      // mailList: CONST.mailTask
    };
  },
  methods: {
    refresh() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/0"
      })
        .then(res => {
          this.handTaskList = res.data.filter((item, index, array) => {
            return item.type == "trade";
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
          console.log();
          this.handTaskSelfList = res.data.filter((item, index, array) => {
            return (
              item.type == "trade" &&
              item.pubUser == this.$store.state.userInfo.userName
            );
          });
          this.handTaskOrderList = res.data.filter((item, index, array) => {
            return (
              item.type == "trade" &&
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
  }
};
</script>
<style  scoped>
.task {
  width: 70%;
  margin: 15px auto;
}
.myeat {
  border-right: 1px red solid;
}
.myeat p,
.myget p {
  text-align: center;
  width: 100%;
}
</style>


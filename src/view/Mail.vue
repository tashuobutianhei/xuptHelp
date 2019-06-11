<template>
  <div class="all">
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待领取快递" name="wait">
        <div v-if="mailTaskList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <MailTask
          v-for="(item,index) in mailTaskList"
          :key="index"
          class="task"
          type="order"
          :status="item.status"
          :mailInfo="item"
        ></MailTask>
      </TabPane>

      <TabPane label="我的记录" name="my">
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
      </TabPane>
      <TabPane label="说些什么" name="commit">
        <Comment :wirteVisble="wirteVisble" @changewirteVisble="changewirteVisble"></Comment>
      </TabPane>
    </Tabs>
    <Tooltip content="有要取的快递吗？" placement="top" class="addbutton">
      <Button type="primary" shape="circle" icon="md-add" @click="modalVisble=true"></Button>
    </Tooltip>

    <Tooltip content="刷新" placement="top" class="refishbutton">
      <Button shape="circle" icon="md-refresh" @click="refresh"></Button>
    </Tooltip>

    <Tooltip content="有什么要说的" placement="top" class="writebutton">
      <Button type="success" shape="circle" icon="md-clipboard" @click="wirteComment"></Button>
    </Tooltip>

    <MailOrderModal :modalVisble="modalVisble" @close="close"></MailOrderModal>
  </div>
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
      wirteVisble: false,
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

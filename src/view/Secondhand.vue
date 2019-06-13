<template>
  <div class="all">
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待领取快递" name="wait">
        <div v-if="handTaskList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <SecondHandTask
          v-for="item in handTaskList"
          :key="item.taskId"
          :Info="item"
          class="task"
          type="order"
          :status="item.status"
          @refresh="refreshAll"
        ></SecondHandTask>
      </TabPane>

      <TabPane label="我的记录" name="my">
        <Row>
          <Col span="12" class="myeat">
            <P>我的出售</P>
            <SecondHandTask
              v-for="item in handTaskSelfList"
              :key="item.taskId"
              :Info="item"
              class="task"
              type="release"
              :status="item.status"
              :rowStyle="1"
              @refresh="refreshAll"
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
              :status="item.status"
              :rowStyle="1"
              @refresh="refreshAll"
            ></SecondHandTask>
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

    <Tooltip content="有什么要说的" placement="top" class="writebutton">
      <Button type="success" shape="circle" icon="md-clipboard" @click="wirteComment"></Button>
    </Tooltip>
    <Tooltip content="刷新" placement="top" class="refishbutton">
      <Button shape="circle" icon="md-refresh" @click="refreshAll"></Button>
    </Tooltip>
    <SecondhandModal :modalVisble="modalVisble" @close="close" @refresh="refreshAll"></SecondhandModal>
  </div>
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
    refreshAll() {
      this.refresh();
      this.refreshName();
      this.$Message.info("任务更新");
    },
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
    this.refreshAll();
  }
};
</script>

<style  scoped>
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

<template>
  <div class="all">
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待领取快递" name="wait">
        <SecondHandTask
          v-for="(item,index) in handTaskList"
          :key="item.taskId"
          :Info="item"
          class="task"
          type="order"
          :status="item.status"
          @getOrder="getOrder"
        ></SecondHandTask>
      </TabPane>

      <TabPane label="我的记录" name="my">
        <Row>
          <Col span="12" class="myeat">
            <P>我的出售</P>
            <SecondHandTask
              v-for="(item,index) in List"
              v-if="index != 3"
              :key="index"
              :Info="item"
              class="task"
              type="release"
              :status="index"
              @getOrder="getOrder"
            ></SecondHandTask>
          </Col>
          <Col span="12" class="myget">
            <P>我的购买</P>
            <SecondHandTask
              v-for="(item,index) in List"
              v-if="index != 0"
              :key="index"
              :Info="item"
              class="task"
              type="order"
              :status="index"
              @getOrder="getOrder"
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

    <SecondhandModal :modalVisble="modalVisble" @close="close"></SecondhandModal>

    <Modal v-model="readyModalVisble" title="确认一下" @on-ok="getOrderOk" @on-cancel="getOrderCancel">
      <p>确认领取了吗？要负责哦！</p>
    </Modal>
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
      handTaskList:[],
      List: CONST.secondHandTask.secondHandTaskList,
      modalVisble: false,
      TabsValue: "wait",
      readyModalVisble: false,
      wirteVisble: false,
      mailList: CONST.mailTask
    };
  },
  methods: {
    refresh() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/status"
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
    close() {
      this.modalVisble = false;
    },
    getOrder() {
      this.readyModalVisble = true;
    },
    getOrderOk() {
      //axios 订单领取
      this.$Message.success("领取成功");
      this.readyModalVisble = false;
    },
    getOrderCancel() {
      this.readyModalVisble = false;
    },
    wirteComment() {
      this.TabsValue = "commit";
      this.wirteVisble = true;
    },
    changewirteVisble() {
      this.wirteVisble = false;
    }
  },
  created(){
    this.refresh()
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
</style>

<template>
  <div class="all">
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待领取订单" name="wait">
        <FoodTask
          v-for="(item,index) in foodList"
          :key="index"
          :foodInfo="item"
          class="task"
          type="order"
          status="0"
          @getOrder="getOrder"
        ></FoodTask>
      </TabPane>
      <TabPane label="我的足迹" name="my">
        <Row>
          <Col span="12" class="myeat">
            <P>我发布的</P>
            <FoodTask
              v-for="(item,index) in foodList"
              :key="index"
              :foodInfo="item"
              class="mytask"
              type="release"
              :status="index"
            ></FoodTask>
            <!-- <FoodTask class="mytask" type="release" status="1"></FoodTask>
            <FoodTask class="mytask" type="release" status="2"></FoodTask>-->
          </Col>
          <Col span="12" class="myget">
            <P>我的领取</P>
            <FoodTask
              v-for="(item,index) in foodList"
              v-if="index != 0"
              :key="index"
              :foodInfo="item"
              class="mytask"
              type="order"
              :status="index"
            ></FoodTask>
            <!-- <FoodTask class="mytask" type="order" status="2"></FoodTask> -->
          </Col>
        </Row>
      </TabPane>
      <TabPane label="说些什么" name="commit">
        <Comment :wirteVisble="wirteVisble" @changewirteVisble="changewirteVisble"></Comment>
      </TabPane>
    </Tabs>
    <Tooltip content="饿了就下单吧" placement="top" class="addbutton">
      <Button type="primary" shape="circle" icon="md-add" @click="modalVisble=true"></Button>
    </Tooltip>

    <Tooltip content="有什么要说的" placement="top" class="writebutton">
      <Button type="success" shape="circle" icon="md-clipboard" @click="wirteComment"></Button>
    </Tooltip>

    <FoodOrderModal :modalVisble="modalVisble" @close="close"></FoodOrderModal>

    <Modal v-model="readyModalVisble" title="确认一下" @on-ok="getOrderOk" @on-cancel="getOrderCancel">
      <p>确认领取了吗？要负责哦！</p>
    </Modal>
  </div>
</template>
<script>
import FoodTask from "../components/FoodTask";
import FoodOrderModal from "../components/FoodOrderModal";
import Comment from "../components/Comment";

import CONST from "../common/index";

export default {
  components: {
    FoodTask,
    FoodOrderModal,
    Comment
  },
  data() {
    return {
      modalVisble: false,
      TabsValue: "wait",
      readyModalVisble: false,
      wirteVisble: false,
      foodList: CONST.foodTask.taskList
    };
  },
  methods: {
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

<template>
  <div class="all">
    <div class="content">
      <Row type="flex" justify="space-between" class="top">
        <Col span="11" class="adiv">
          <p class="title">校园外卖(19条待领取)</p>
          <FoodTask
            v-for="(item,index) in foodList"
            :key="index"
            :foodInfo="item"
            class="task"
            type="order"
            status="0"
            @getOrder="getOrder"
          ></FoodTask>
          <p class="foot" @click="goto('Food')">
            查看全部
            <Icon type="ios-arrow-down"/>
          </p>
        </Col>
        <Col span="11" class="adiv">
          <p class="title">快递代取(12条待领取)</p>
          <MailTask
            v-for="(item,index) in mailList"
            :key="index"
            class="task"
            type="order"
            status="0"
            @getOrder="getOrder"
            :mailInfo="item"
          ></MailTask>
          <p class="foot" @click="goto('Mail')">
            查看全部
            <Icon type="ios-arrow-down"/>
          </p>
        </Col>
      </Row>
      <Row class="bottom">
        <Col span="24" class="adiv">
          <p class="title">二手交易(120件物品)</p>
          <p class="foot">
            查看全部
            <Icon type="ios-arrow-down"/>
          </p>
        </Col>
      </Row>
    </div>
    <Tooltip content="饿了就下单吧" placement="top" class="addbutton">
      <Button type="primary" shape="circle" icon="md-add" @click="foodmodalVisble=true"></Button>
    </Tooltip>
    <Tooltip content="有要取的快递吗？" placement="top" class="addbutton_mail">
      <Button type="success" shape="circle" icon="md-send" @click="mailmodalVisble=true"></Button>
    </Tooltip>
    <FoodOrderModal :modalVisble="foodmodalVisble" @close="foodclose"></FoodOrderModal>
    <MailOrderModal :modalVisble="mailmodalVisble" @close="emailclose"></MailOrderModal>
  </div>
</template>
<script>
import FoodTask from "../components/FoodTask";
import MailTask from "../components/MailTask";
import FoodOrderModal from "../components/FoodOrderModal";
import MailOrderModal from "../components/MailOrderModal";


import CONST from "../common/index";

export default {
  components: {
    FoodTask,
    MailTask,
    FoodOrderModal,
    MailOrderModal
  },
  data() {
    return {
      mailList: CONST.mailTask,
      foodList: CONST.foodTask.taskList,
      foodmodalVisble: false,
      mailmodalVisble: false
    };
  },
  methods: {
    goto(e) {
      this.$router.push(`/${e}`);
    },
    getOrder() {
      //   this.readyModalVisble = true;
    },
    foodclose() {
      this.foodmodalVisble = false;
    },
    emailclose() {
      this.mailmodalVisble = false;
    }
  }
};
</script>
<style scoped>
.adiv {
  /* border: 1px red solid; */
  box-shadow: 0px 0px 2px grey;
  height: 400px;
  overflow: hidden;
  position: relative;
}
.content {
  background: white;
  min-height: 800px;
  width: 80%;
  margin: 30px auto;
  overflow: hidden;
}
.title {
  width: 100%;
  text-align: center;
  color: coral;
  font-size: 14px;
  font-weight: bolder;
}
.foot {
  width: 100%;
  text-align: center;
  color: white;
  background-color: rgba(10, 10, 10, 0.5);
  font-size: 14px;
  /* font-weight: bolder; */
  position: absolute;
  bottom: 0px;
  background: linear-gradient(white, black);
  opacity: 0.5;
  cursor: pointer;
}
.top,
.bottom {
  margin: 50px 10px;
}
.task {
  width: 90%;
  margin: 1px auto;
}
.addbutton {
  position: fixed;
  top: 100px;
  right: 50px;
}
.addbutton_mail{
   position: fixed;
  top: 150px;
  right: 50px;
}
</style>

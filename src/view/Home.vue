<template>
  <div class="all">
    <div class="topTitle">
      <div class="topTitleModal">
        <div class="topTitleContent">
          <h3>#西邮帮</h3>
          <p>简单生活，方便你我</p>
          <Row type="flex" justify="space-between" class="buttongroup">
            <Col span="12">
              <Button type="default" ghost class="buttongroupItem" label="large">更多详情</Button>
            </Col>
            <Col span="12">
              <Button type="default" ghost class="buttongroupItem" label="large">马上体验</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="content">
      <Row type="flex" justify="space-between" class="top">
        <Col span="11" class="imgBody">
          <div>
            <p>饿了嘛？又不想动嘛？在上忙没时间去吃饭？那不行呀，身体重要，发一单吧</p>
          </div>
        </Col>
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
        <Col span="11" class="imgBody imgBody2">
          <div>
            <p>等了那么久快递终于到了？懒了？热了？冷了？忙了？没关系，总有人顺路。</p>
          </div>
        </Col>

        <Col span="24" class="imgBody imgBody3">
          <div>
            <p>月底了？缺钱了？别再问家里要了！！！小哥哥小姐姐们！来！接单吧！顺路就能赚钱</p>
          </div>
        </Col>
      </Row>

      <Divider>买买买？卖卖卖？</Divider>
      <Row class="bottom">
        <Col span="24" class="imgBody imgBody4">
          <div>
            <p>月底了？缺钱了？别再问家里要了！！！小哥哥小姐姐们！来！接单吧！顺路就能赚钱</p>
          </div>
        </Col>
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
.topTitle {
  width: 100%;
  height: 600px;
  /* background-color: aqua; */
  background-image: url("../assets/img/1.jpg");
  background-size: 100%;
  overflow: hidden;
  color: white;
  text-align: center;
}

.topTitleContent {
  width: 50%;
  height: 500px;
  margin: 50px auto;
  /* border: 1px wheat solid; */
}
.topTitleModal {
  background-color: rgba(10, 10, 10, 0.5);
  width: 100%;
  overflow: hidden;
  height: 600px;
}
.topTitleContent h3 {
  font-size: 20px;
}
.topTitleContent p {
  margin: 100px;
  font-size: 45px;
  font-family: helvetica-neue-LT-bold, helvetica neue light, Helvetica, Arial;
}
.buttongroup {
  width: 50%;
  margin: 50px auto;
}
.adiv {
  /* border: 1px red solid; */
  box-shadow: 0px 0px 2px grey;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin-top: 30px;
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
.addbutton_mail {
  position: fixed;
  top: 150px;
  right: 50px;
}
.imgBody {
  background-image: url("../assets/img/3.jpg");
  height: 400px;
  background-repeat: no-repeat;
  background-size: 100% 400px;
  margin-top: 30px;
  position: relative;
}
.imgBody2 {
  background-image: url("../assets/img/4.jpg");
}

.imgBody3 {
  background-image: url("../assets/img/5.jpg");
  height: 400px;
}
.imgBody4 {
  background-image: url("../assets/img/2.jpg");
  height: 400px;
}
.imgBody div {
  width: 100%;
  height: 400px;
  background-color: rgba(10, 10, 10, 0.5);
}
.imgBody p {
  text-align: center;
  width: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 190px;
  color: white;
  font-size: 13px;
}
</style>

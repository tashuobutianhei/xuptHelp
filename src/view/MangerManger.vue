<template>
  <div>
    <Tabs :value="TabsValue" class="content">
      <TabPane label="外卖" name="food">
        <div v-if="FoodList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in FoodList" :key="index" class="col">
            <FoodTask :key="item.taskId" :foodInfo="item" type="manger" @refresh="getTask"></FoodTask>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="快递" name="mail">
        <div v-if="MailList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in MailList" :key="index" class="col">
            <MailTask :key="index" type="manger" :mailInfo="item"  @refresh="getTask"></MailTask>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="二手交易" name="hand">
        <div v-if="HandList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in HandList" :key="index" class="col">
            <SecondHandTask :Info="item" type="manger" :rowStyle="1"  @refresh="getTask"></SecondHandTask>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import SecondHandTask from "../components/SecondHandTask";
import FoodTask from "../components/FoodTask";
import MailTask from "../components/MailTask";
import Comment from "../components/Comment";
import CONST from "../common/index.js";

export default {
  data() {
    return {
      //   List: CONST.secondHandTask.secondHandTaskList,
      // FoodList: CONST.foodTask.taskList,
      // MailList: CONST.mailTask,
      // HandList: CONST.secondHandTask.secondHandTaskList,
      FoodList: [],
      MailList: [],
      HandList: [],
      TabsValue: "food"
    };
  },
  components: {
    SecondHandTask,
    MailTask,
    FoodTask
  },
  methods: {
    getTask() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/0"
      })
        .then(res => {
          this.FoodList = res.data.filter((item, index, array) => {
            return item.type == "food";
          });
          this.HandList = res.data.filter((item, index, array) => {
            return item.type == "trade";
          });
          this.MailList = res.data.filter((item, index, array) => {
            return item.type == "express";
          });
                this.$Message.info("任务更新");

        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTask();
  }
};
</script>
<style scoped>
.row {
  border: 1px red solid;
}
.col {
  /* width: 100%; */
  height: 350px;
  margin-bottom: 15px;
}
.task {
  width: 100%;
  height: 350px;
}
.no {
  width: 20%;
  margin: 100px 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>


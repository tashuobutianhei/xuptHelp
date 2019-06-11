<template>
  <div>
    <Tabs :value="TabsValue" class="content">
      <TabPane label="外卖" name="food">
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in FoodList" :key="index" class="col">
            <FoodTask :key="item.taskId" :foodInfo="item" type="manger" :status="5"></FoodTask>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="快递" name="mail">
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in MailList" :key="index" class="col">
            <MailTask :key="index" type="manger" :status="5" :mailInfo="item"></MailTask>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="二手交易" name="hand">
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in HandList" :key="index" class="col">
            <SecondHandTask :Info="item" type="manger" status="5" :rowStyle="1"></SecondHandTask>
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
      FoodList: CONST.foodTask.taskList,
      MailList: CONST.mailTask,
      HandList: CONST.secondHandTask.secondHandTaskList,
      TabsValue: "food"
    };
  },
  components: {
    SecondHandTask,
    MailTask,
    FoodTask
  }
};
</script>
<style scoped>
.row {
  border: 1px red solid;
}
.col {
  /* width: 100%; */
  height: 300px;
  margin-bottom: 15px;
}
.task {
  width: 100%;
  height: 300px;
}
</style>


<template>
  <div>
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待审核" name="wait">
        <!-- <div v-if="handTaskList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>-->
        <Row class="row" :gutter="8">
          <Col :span="6" v-for="(item,index) in List" :key="index" class="col">
            <SecondHandTask :Info="item" class="task" type="manger" status="-1" :rowStyle="1"></SecondHandTask>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import SecondHandTask from "../components/SecondHandTask";
import Comment from "../components/Comment";
import SecondhandModal from "../components/SecondhandModal";

import CONST from "../common/index.js";

export default {
  data() {
    return {
      List: CONST.secondHandTask.secondHandTaskList,
      TabsValue: "wait"
    };
  },
  components: {
    SecondHandTask
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
}
.task {
  width: 100%;
  height: 300px;
}
</style>


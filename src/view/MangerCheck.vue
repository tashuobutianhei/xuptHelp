<template>
  <div>
    <Tabs :value="TabsValue" class="content">
      <TabPane :label="`待审核${List.length}`" name="wait">
        <div v-if="List.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
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
      // List: CONST.secondHandTask.secondHandTaskList,
      List: [],
      TabsValue: "wait"
    };
  },
  components: {
    SecondHandTask
  },
  created() {
    this.axios({
      method: "get",
      url: "http://192.168.43.138:9000/task/-1"
    })
      .then(res => {
        this.List = res.data.filter((item, index, array) => {
          return item.type == "trade";
        });
      })
      .catch(err => {
        console.log(err);
      });
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


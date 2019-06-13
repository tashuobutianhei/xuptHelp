<template>
  <div class="all">
    <Tabs :value="TabsValue" class="content">
      <TabPane label="待领取订单" name="wait">
        <div v-if="foodTaskList.length==0" class="no">
          <img src="../assets/img/no.png">
          <p>还没有人发布哦</p>
        </div>
        <FoodTask
          v-for="(item) in foodTaskList"
          :key="item.taskId"
          :foodInfo="item"
          class="task"
          type="order"
          :status="item.status"
          @refresh="refreshAll"
        ></FoodTask>
      </TabPane>
      <TabPane label="我的足迹" name="my">
        <Row>
          <Col span="12" class="myeat">
            <P>我发布的</P>
            <FoodTask
              v-for="(item) in foodTaskSelfList"
              :key="item.taskId"
              :foodInfo="item"
              class="mytask"
              type="release"
              :status="item.status"
              @refresh="refreshAll"
            ></FoodTask>
            <!-- <FoodTask class="mytask" type="release" status="1"></FoodTask>
            <FoodTask class="mytask" type="release" status="2"></FoodTask>-->
          </Col>
          <Col span="12" class="myget">
            <P>我的领取</P>
            <FoodTask
              v-for="(item) in foodTaskOrderList"
              :key="item.taskId"
              :foodInfo="item"
              class="mytask"
              type="order"
              :status="item.status"
              @refresh="refreshAll"
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

    <Tooltip content="刷新" placement="top" class="refishbutton">
      <Button shape="circle" icon="md-refresh" @click="refreshAll"></Button>
    </Tooltip>

    <FoodOrderModal :modalVisble="modalVisble" @close="close" @refresh="refreshAll"></FoodOrderModal>
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
      foodTaskList: [], //待领取
      foodTaskSelfList: [], //发布
      foodTaskOrderList: [], //领取
      modalVisble: false,
      TabsValue: "wait",

      wirteVisble: false
      // foodList: CONST.foodTask.taskList,
      // itId: ""
    };
  },
  methods: {
    refreshAll() {
      this.refresh();
      this.refreshName();
      // this.$Message.info("Clicked cancel");
      this.$Message.info("任务更新");
    },
    refresh() {
      this.axios({
        method: "get",
        url: "http://192.168.43.138:9000/task/0"
      })
        .then(res => {
          this.foodTaskList = res.data.filter((item, index, array) => {
            return item.type == "food";
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
          this.foodTaskSelfList = res.data.filter((item, index, array) => {
            return (
              item.type == "food" &&
              item.pubUser == this.$store.state.userInfo.userName
            );
          });
          this.foodTaskOrderList = res.data.filter((item, index, array) => {
            return (
              item.type == "food" &&
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

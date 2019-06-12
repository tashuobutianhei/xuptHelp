<template>
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
      ></FoodTask>
      <!-- <FoodTask class="mytask" type="order" status="2"></FoodTask> -->
    </Col>
  </Row>
</template>
<script>
import FoodTask from "../components/FoodTask";
import FoodOrderModal from "../components/FoodOrderModal";
import Comment from "../components/Comment";

export default {
  data() {
    return {
      foodTaskList: [], //待领取
      foodTaskSelfList: [], //发布
      foodTaskOrderList: [], //领取
      modalVisble: false,
      TabsValue: "wait",
      wirteVisble: false
    };
  },
  components: {
    FoodTask,
    FoodOrderModal,
    Comment
  },
  methods: {
    refreshAll() {
      this.refresh();
      this.refreshName();
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
    this.refresh();
    this.refreshName();
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

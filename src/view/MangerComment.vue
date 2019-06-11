<template>
  <div>
    <div class="commentItem" v-for="item in commitList" :key="item.commentId">
      <Row type="flex" justify="space-between">
        <Col>
          <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
          <span>{{item.user}}</span>
        </Col>
        <Col>
          <div class="itme">
            <Time :time="item.time"/>
          </div>
        </Col>
      </Row>
      <Row style="padding:15px 20px">
        <p>{{item.content}}</p>
      </Row>
      <span class="replay" @click="replay(item)">回复</span>
      <span
        class="delete"
        @click="deleteIt(item)"
        v-if="$store.state.userInfo.userName == item.user"
      >删除</span>
    </div>
  </div>
</template>
<script>

import CONST from "../common/index.js";

export default {
  data() {
    return {
      List: [],
    };
  },
  components: {
      
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
  height: 300px;
}
.task {
  width: 100%;
  height: 300px;
}
.no {
  width: 20%;
  margin: 100px 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>


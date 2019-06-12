<template>
  <div class="bodycontent">
    <Tabs value="name1">
      <TabPane label="校园外卖" name="name1"><foodtaskcard></foodtaskcard></TabPane>
      <TabPane label="快递代取" name="name2"><mailtaskcard></mailtaskcard></TabPane>
      <TabPane label="二手交易" name="name3"><secondhandtaskcard></secondhandtaskcard></TabPane>
    </Tabs>
    <!-- <Row>
      <Col span="8">
        <taskcard :info="foodList"></taskcard>
      </Col>
      <Col span="8">
        <taskcard :info="mailList"></taskcard>
      </Col>
      <Col span="8">
        <taskcard :info="secondhandList"></taskcard>
      </Col>
    </Row>-->
  </div>
</template>
<script>
import taskcard from "../components/TaskCard";

import foodtaskcard from "../components/FoodTaskcard";
import mailtaskcard from "../components/MailTaskcard";
import secondhandtaskcard from "../components/SecondhandTaskcard";



export default {
  data() {
    return {
      foodList: [
        {
          name: "任务名",
          taskid: "1",
          type: "校园外卖",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "校园外卖",
          taskid: "2",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "校园外卖",
          taskid: "3",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          taskid: "4",
          type: "校园外卖",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        }
      ],
      mailList: [
        {
          name: "任务名",
          taskid: "1",
          type: "快递代取",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "快递代取",
          taskid: "2",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "快递代取",
          taskid: "3",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          taskid: "4",
          type: "快递代取",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        }
      ],
      secondhandList: [
        {
          name: "任务名",
          taskid: "1",
          type: "二手交易",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "二手交易",
          taskid: "2",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          type: "二手交易",
          taskid: "3",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        },
        {
          name: "任务名",
          taskid: "4",
          type: "二手交易",
          url: "https://movie.douban.com/subject/1292052/",
          taskcontent: "任务内容"
        }
      ]
    };
  },
  components: {
    taskcard,

    mailtaskcard,
    foodtaskcard,
    secondhandtaskcard
  }
};
</script>
<style scoped>
.bodycontent {
  background-color: #fff;
  margin-left: 1px;
}
</style>

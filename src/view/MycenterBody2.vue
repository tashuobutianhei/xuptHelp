<template>
  <Row>
    <Col span="8">
      <taskcard :info="foodList"></taskcard>
    </Col>
    <Col span="8" offset="0">
      <taskcard :info="mailList"></taskcard>
    </Col>
    <Col span="8" offset="0">
      <taskcard :info="secondhandList"></taskcard>
    </Col>
  </Row>
</template>
<script>
import taskcard from "../components/TaskCard";

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
    taskcard
  }
};
</script>
<style scoped>
</style>

<template>
  <div class="comment">
    <div class="commentItem noneComment" v-if="commitList.length == 0">
      <p>
        暂时还没有评论
        <span class="write" @click="commentVisble = !commentVisble">写下你的看法吧</span>
      </p>
    </div>
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
    <div class="replayArea" v-if="commentVisble || wirteVisble || replayVisble">
      <Input type="textarea" v-model="comment" placeholder="说些什么" on-keydown="nobackspace"/>
      <Button type="primary" class="replayButton" @click="readyCommit">确认</Button>
    </div>
  </div>
</template>
<script>
import CONST from "@/common/index.js";
export default {
  props: ["wirteVisble", "taskId"],
  data() {
    // console.log( CONST.foodTask.commentList)
    return {
      time: new Date(),
      // commitList: CONST.foodTask.commentList,
      commitList: [],
      comment: "",
      replayVisble: false,
      commentVisble: false
    };
  },
  watch: {
    wirteVisble(now, before) {
      if (now) {
        this.comment = "";
      }
    }
  },
  created() {
    if (this.taskId) {
      this.axios({
        url: "http://192.168.43.138:9000/comment/" + this.taskId,
        method: "get"
      }).then(res => {
        this.commitList = res.data;
      });
    }
  },
  methods: {
    replay(item) {
      // this.wirteVisble = false;
      this.replayVisble = true;
      this.$emit("changewirteVisble");
      this.comment = `@ ${item.nickName} ：`;
    },
    deleteIt(item) {
      this.axios({
        url: "http://192.168.43.138:9000/comment/" + item.commentId,
        method: "delete"
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    nobackspace(e) {
      console.log(111);
      console.log(e);
    },

    readyCommit() {
      this.axios({
        url: "http://192.168.43.138:9000/comment/",
        method: "post",
        data: {
          user: this.$store.state.userInfo.userName,
          taskId: this.taskId,
          time: new Date().getTime(),
          content: this.comment
        }
      }).then(res => {
        if (res.data == "success") {
          this.commitList.push({
            nickName: this.$store.state.userInfo.userName,
            comment: this.comment,
            time: new Date()
          });
          this.comment = "";
          this.$Message.success("评论成功");
          this.commentVisble = false;
        } else {
          this.$Message.error("失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.comment {
  width: 100%;
  margin: 5px auto;
}
.commentItem {
  padding: 5px;
  position: relative;
  border: 1px solid #eeeeee;
}
.replay {
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
}
.delete {
  position: absolute;
  bottom: 5px;
  right: 40px;
  cursor: pointer;
  color: red;
}
.noneComment {
  text-align: center;
}
.nickname {
  color: #666666;
  font-weight: bolder;
}
.replayButton {
  /* float: right; */
}
.replayArea {
  position: relative;
  /* top:30px; */
}
.write {
  color: blue;
  cursor: pointer;
}
</style>

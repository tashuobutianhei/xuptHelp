<template>
  <div class="task">
    <Row type="flex" justify="space-between">
      <Col style="text-align:center">
        <Tooltip content="喜欢就收藏">
          <Icon type="ios-star-outline" style="color:red" class="star"/>
        </Tooltip>
        <span class="nickname">{{Info.title}}</span>
      </Col>
      <Col>
        <div class="itme">
          <Time :time="Info.timer"/>
        </div>
      </Col>
    </Row>
    <Row class="conent" :gutter="8">
      <Col :md="style" :sm="24" :xs="24">
        <div class="carousel" :style="{height:rowStyle == 1 ? '100px' : '200px'}">
          <img class="img" :src="img" :style="{height:rowStyle == 1 ? '100px' : '200px'}">
          <!-- <img class="img" src="../assets/img/5.jpg"> -->
        </div>
      </Col>

      <Col style="margin-top:5px" :xl="style" :md="24" :xs="24">
        <div class="value">
          <p>
            <span>卖家：</span>
            {{Info.pubUser}}
          </p>
          <p class="storeContent">
            <span>商品描述：</span>
            {{Info.content}}
          </p>
          <p>
            <span>入手价：</span>
            {{Info.oldPrice}}
          </p>
          <p>
            <span>出手价：</span>
            {{Info.newPrice}}
          </p>
          <p>
            <span>联系方式：</span>
            {{transform(Info.phone)}}
          </p>
        </div>
      </Col>
    </Row>
    <Row type="flex" justify="end">
      <Col>
        <Button
          type="primary"
          class="orderButton"
          v-if="type=='order' && status==0 "
          icon="md-flag"
          @click="getOrder"
          :disabled="$store.state.userInfo.userName == Info.pubUser"
        >马上入手</Button>

        <!-- <Poptip confirm title="确认收货了吗?" @on-ok="readyOrder" class="orderButton">
          <Button type="warning" v-if="type=='order' && status==1 " icon="md-alarm">等待同意</Button>
        </Poptip>-->
        <Poptip confirm title="收到了吗" @on-ok="getMyOrder" class="orderButton">
          <Button type="primary" class="orderButton" v-if="type=='order' && status==1 ">确认收货</Button>
        </Poptip>

        <Button type="warning" class="orderButton" v-if="type=='order' && status==2 ">待评论</Button>

        <Button
          type="warning"
          class="orderButton"
          v-if="type=='release' && status==-1 "
          disabled
        >待审核</Button>

        <Poptip confirm title="确认退单吗?" @on-ok="outOrder" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==0 " icon="md-clock">等待买家</Button>
        </Poptip>

        <Poptip confirm title="快去送货?" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==1 " icon="md-heart">待送货(快去送货)</Button>
        </Poptip>

        <Poptip confirm title="确认收货了吗?" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==2 " icon="md-heart">交易完成</Button>
        </Poptip>

        <Poptip
          confirm
          title="通过吗?"
          class="checkButton"
          v-if="type =='manger' && status==-1 "
          cancel-text="不通过"
          ok-text="通过"
          @on-ok="passon"
          @on-cancel="cancel"
        >
          <Button type="primary" icon="md-heart" size="small" :disabled="Ifcheck">审核</Button>
        </Poptip>
        <Poptip
          confirm
          title="选择相应操作?"
          class="MangerButton"
          v-if="type =='manger' && status!=-1 "
          cancel-text="清理"
          ok-text="下架"
          @on-ok="down"
          @on-cancel="clear"
        >
          <Button type="warning" icon="md-heart" size="small">操作</Button>
        </Poptip>
        <!-- <Poptip confirm title="确认了吗？?" class="MangerButton" v-if="type =='manger' && status!=-1 ">
          <Button type="error" icon="md-heart" size="small">下架</Button>
          <Button type="warning" icon="md-heart" size="small">清理</Button>
        </Poptip>-->
        <!-- <Button
          type="warning"
          class="orderButton"
          v-if="type=='release' && status==2 "
          icon="md-chatboxes"
        >评价</Button>-->
      </Col>
    </Row>
    <Comment :taskId="Info.taskId" v-if="type != 'manger'&& status == 0"></Comment>
    <Modal v-model="readyModalVisble" title="确认一下" @on-ok="getOrderOk" @on-cancel="getOrderCancel">
      <p>确认下单了吗？</p>
    </Modal>
  </div>
</template>
<script>
/*
卖家：待出价 -出价-> 待同意 -同意了-> 完成交易
买家：待同意 -同意-> 待交易 -交易了-> 完成（评价）


0 未领取
1 为交易
2 交易完成

发布者：release
0 等待买家  退单
1 待送货   无
2 完成

订单：order
0 接单  
1 待送货   无
2 收到货物 确认收货


*/
import Comment from "./Comment";
const status = {
  0: "待出价",
  1: "待交易",
  2: "已完成"
};
export default {
  props: ["type", "status", "Info", "rowStyle"],
  components: {
    Comment
  },
  data() {
    return {
      Ifcheck: false,
      time: new Date(),
      money: 12,
      pay: 2,
      imgwhich: 0,
      readyModalVisble: false
    };
  },
  computed: {
    img() {
      return `http://192.168.43.138:9000/${this.Info.image}`;
    },
    style() {
      if (this.rowStyle == "1") {
        return 24;
      } else {
        return 12;
      }
    }
  },
  methods: {
    down() {
      this.axios({
        url: `http://192.168.43.138:9000/manager/${this.Info.taskId}`,
        method: "put"
      })
        .then(res => {
          if (res.data == "success") {
            this.$Message.success("操作成功");
            this.$emit("refresh");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.axios({
        url: `http://192.168.43.138:9000/manager/${this.Info.taskId}`,
        method: "delete"
      })
        .then(res => {
          if (res.data == "success") {
            this.$Message.success("操作成功");
            this.$emit("refresh");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    passon() {
      this.axios({
        url: `http://192.168.43.138:9000/manager/`,
        method: "post",
        data: {
          id: this.Info.taskId,
          pass: 1
        }
      })
        .then(res => {
          if (res.data == success) {
            this.Ifcheck = true;
            this.$Message.success("审核成功");
            this.$emit("refresh");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.axios({
        url: `http://192.168.43.138:9000/manager/`,
        method: "post",
        data: {
          id: this.Info.taskId,
          pass: 0
        }
      })
        .then(res => {
          if (res.data == success) {
            this.$Message.success("审核成功");
            this.$emit("refresh");

            this.Ifcheck = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getOrder() {
      this.readyModalVisble = true;
    },
    getOrderOk() {
      //axios 订单领取

      this.axios({
        method: "put",
        url: `http://192.168.43.138:9000/task/${this.Info.taskId}`
      }).then(res => {
        console.log(res);
        if (res.data == "success") {
          this.refresh();
          this.$Message.success("下单成功");
          this.$emit("refresh");

          this.readyModalVisble = false;
        }
      });
      this.readyModalVisble = false;
    },
    getOrderCancel() {
      this.readyModalVisble = false;
    },
    outOrder() {
      this.axios({
        method: "post",
        url: "http://192.168.43.138:9000/task/" + this.Info.taskId
      })
        .then(res => {
          this.$Message.success("退单成功");
          this.$emit("refresh");

          this.Info.status = 3;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMyOrder() {
      this.axios({
        method: "delete",
        url: "http://192.168.43.138:9000/task/" + this.Info.taskId
      })
        .then(res => {
          this.$Message.success("收货成功！");
          this.$emit("refresh");

          this.Info.status = 2;
        })
        .catch(err => {
          console.log(err);
        });
    },
    readyOrder() {
      this.$Message.success("订单完成！");
      this.$emit("refresh");
    },
    transform(it) {
      if (this.status == 0 && this.type !== "release") {
        return it.replace(/[0-9]/g, "*");
      } else {
        return it;
      }
    }
  }
};
</script>
<style  scoped>
.task {
  /* border: 1px red solid; */
  padding: 5px;
  /* background-color: #ffeab0; */
  box-shadow: 0px 0px 2px orange;
  background: #ffffff;
  border-radius: 5px;
  font-size: 14px;
  /* height: 500PX; */
}
.conent {
  width: 90%;
  margin: 10px auto;
  border-top: 1px solid #eeeeee;
  padding: 5px;

  /* background: rgba(245, 249, 247, 0.5); */
}
/* span{
        color: #297bf7
    } */
.comment {
  width: 80%;
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
}
.noneComment {
  text-align: center;
}
.nickname {
  color: #666666;
  font-weight: bolder;
}
.itme span {
  color: #aaaaaa;
}
.value {
  line-height: 22px;
}
.value span {
  color: coral;
}
.orderButton {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.star {
  font-weight: bolder;
  color: red;
  cursor: pointer;
}
.img {
  width: 100%;
  /* height: 200px; */
}
.storeContent {
  height: 60px;
  max-height: 100px;
}

.carousel {
  /* height: 200px; */
  border: 1px red solid;
}
.carousel img {
  width: 100%;
  /* //max-height: 100px; */
}
</style>


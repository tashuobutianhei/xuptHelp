<template>
  <div class="task">
    <Row type="flex" justify="space-between">
      <Col>
        <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
        <span class="nickname">{{foodInfo.pubUser}}</span>
      </Col>
      <Col>
        <div class="itme">
          <Time :time="foodInfo.timer"/>
        </div>
      </Col>
    </Row>
    <Row class="conent">
      <Col>
        <p class="foodConent">
          <span>{{foodInfo.pubUser}} 想吃：</span>
          {{foodInfo.description}}
        </p>
      </Col>
      <Col style="margin-top:5px">
        <div class="value">
          <p>
            <span class="span">预计金额：</span>
            ￥{{foodInfo.cost}}
          </p>
          <p>
            <span>酬劳：</span>
            ￥{{foodInfo.pay}}
          </p>
          <p>
            <span>预期送达时间：</span>
            {{`${new Date(foodInfo.time).getHours()}:${new Date(foodInfo.time).getMinutes()}`}}
          </p>
          <p>
            <span>收餐地址：</span>
            {{foodInfo.address}}
          </p>
          <p>
            <span>联系方式：</span>
            {{transform(foodInfo.phone)}}
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
          :disabled="$store.state.userInfo.userName == foodInfo.pubUser"
        >马上接单</Button>

        <Poptip confirm title="确认收货了吗?" class="orderButton">
          <!-- @on-ok="readyOrder" -->
          <Button type="warning" v-if="type=='order' && status==1 " icon="md-alarm">已完成（快去完成）</Button>
        </Poptip>

        <Button type="primary" class="orderButton" v-if="type=='order' && status==2 " disabled>已完成</Button>

        <Button
          type="primary"
          class="orderButton"
          v-if="type=='release' && status==-1 "
          disabled
        >已退单</Button>

        <Poptip confirm title="确认退单吗?" @on-ok="outOrder" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==0 " icon="md-clock">待领取</Button>
        </Poptip>

        <Poptip confirm title="确认收货了吗?" @on-ok="getMyOrder" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==1 " icon="md-heart">确认收货</Button>
        </Poptip>

        <Button
          type="warning"
          class="orderButton"
          v-if="type=='release' && status==2 "
          icon="md-chatboxes"
        >评价</Button>

        <Poptip
          confirm
          title="选择相应操作?"
          class="MangerButton"
          v-if="type =='manger'"
          cancel-text="清理"
          ok-text="下架"
          @on-ok="down"
          @on-cancel="clear"
        >
          <Button type="warning" icon="md-heart" size="small">操作</Button>
        </Poptip>

        <!-- <Poptip confirm title="?" class="MangerButton" v-if="status==5">
          <Button type="error" icon="md-heart" size="small">下架</Button>
          <Button type="warning" icon="md-heart" size="small">清理</Button>
        </Poptip>-->
      </Col>
    </Row>
    <Modal v-model="readyModalVisble" title="确认一下" @on-ok="getOrderOk" @on-cancel="getOrderCancel">
      <p>确认领取了吗？要负责哦！</p>
    </Modal>
  </div>
</template>
<script>
const status = {
  0: "待领取",
  1: "待完成",
  2: "已完成"
};
export default {
  props: ["type", "status", "foodInfo"],
  data() {
    return {
      time: new Date(),
      money: 12,
      pay: 2,
      readyModalVisble: false
    };
  },
  methods: {
    down() {
      this.axios({
        url: `http://192.168.43.138:9000/manager/${this.foodInfo.taskId}`,
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
        url: `http://192.168.43.138:9000/manager/${this.foodInfo.taskId}`,
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
    // getOrder() {
    //   this.$emit("getOrder", { id:  });
    // },
    getOrder() {
      this.readyModalVisble = true;
    },
    getOrderOk() {
      //axios 订单领取
      this.axios({
        method: "put",
        url: `http://192.168.43.138:9000/task/${this.foodInfo.taskId}`
      }).then(res => {
        console.log(res);
        if (res.data == "success") {
          this.$emit("refresh");
          this.$Message.success("领取成功");
          this.readyModalVisble = false;
        }
      });
    },
    getOrderCancel() {
      this.readyModalVisble = false;
    },
    outOrder() {
      this.axios({
        method: "post",
        url: "http://192.168.43.138:9000/task/" + this.foodInfo.taskId
      })
        .then(res => {
          this.$Message.success("退单成功");
          this.foodInfo.status = 3;
          this.$emit("refresh");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMyOrder() {
      this.axios({
        method: "delete",
        url: "http://192.168.43.138:9000/task/" + this.foodInfo.taskId
      })
        .then(res => {
          this.$Message.success("收货成功！");
          this.$emit("refresh");
          this.foodInfo.status = 2;
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
.MangerButton {
  /* width: 150px;
  border: #666666 1px solid; */
  /* position: absolute;
  bottom: 0px;
  right: 10px; */
}
.foodConent {
  height: 80px;
}
</style>
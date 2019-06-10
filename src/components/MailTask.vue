<template>
  <div class="task">
    <Row type="flex" justify="space-between">
      <Col>
        <Avatar style="color: #f56a00;background-color: #fde3cf">L</Avatar>
        <span class="nickname">{{mailInfo.pubUser}}</span>
      </Col>
      <Col>
        <div class="itme">
          <Time :time="time"/>
        </div>
      </Col>
    </Row>
    <Row class="conent">
      <Col>
        <p>
          <span>{{mailInfo.pubUser}} 的快递：</span>
          {{transform(mailInfo.content)}}
        </p>
      </Col>
      <Col style="margin-top:5px">
        <div class="value">
          <!-- <p>
            <span class="span">预计金额：</span>
            ￥{{money}}
          </p>-->
          <p>
            <span>酬劳：</span>
            ￥{{mailInfo.pay}}
          </p>
          <p>
            <span>预期送达时间：</span>
            {{`${new Date(mailInfo.time).getHours()}:${new Date(mailInfo.time).getMinutes()}`}}
          </p>
          <p>
            <span>收货地址：</span>
            {{transform(mailInfo.address)}}
          </p>
          <p>
            <span>联系方式：</span>
            {{transform(mailInfo.phone)}}
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
        >马上接单</Button>

        <Poptip confirm title="确认收货了吗?" @on-ok="readyOrder" class="orderButton">
          <Button type="warning" v-if="type=='order' && status==1 " icon="md-alarm">已完成（快去完成）</Button>
        </Poptip>

        <Button type="primary" class="orderButton" v-if="type=='order' && status==2 " disabled>已完成</Button>

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
      </Col>
    </Row>
  </div>
</template>
<script>
const status = {
  0: "待领取",
  1: "待完成",
  2: "已完成"
};
export default {
  props: ["type", "status", "mailInfo"],
  data() {
    return {
      time: new Date(),
      money: 12,
      pay: 2
    };
  },
  //   computed: {
  //     mailContent() {
  //       if (this.status == 0) {
  //         return this.mailInfo.content.replace(/[0-9]/g, "*");
  //       } else {
  //         return this.mailInfo.content;
  //       }
  //     }
  //   },
  methods: {
    getOrder() {
      this.$emit("getOrder", {});
    },
    outOrder() {
      this.$Message.success("退单成功");
    },
    getMyOrder() {
      this.$Message.success("收货成功！");
    },
    readyOrder() {
      this.$Message.success("订单完成！");
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
</style>


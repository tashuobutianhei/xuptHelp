<template>
  <div class="task">
    <Row type="flex" justify="space-between">
      <Col style="text-align:center">
        <!-- <Avatar style="color: #f56a00;background-color: #fde3cf">L</Avatar> -->
        <Tooltip content="喜欢就收藏">
          <Icon type="ios-star-outline" style="color:red" class="star"/>
        </Tooltip>
        <span class="nickname">{{Info.title}}</span>
      </Col>
      <Col>
        <div class="itme">
          <Time :time="time"/>
        </div>
      </Col>
    </Row>
    <Row class="conent"  :gutter="8">
      <Col :md="12" :sm="24" :xs="24">
        <Carousel autoplay v-model="imgwhich" loop :autoplay-speed="5000">
          <CarouselItem>
            <div class="demo-carousel"><img  class="img" :src="img"></img></div>
          </CarouselItem>
        </Carousel>
      </Col>
      
      <Col style="margin-top:5px"  :xl="style"  :md="24" :xs="24">
        <div class="value">
        
           <p>
          <span> 卖家：</span>
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
        >马上入手</Button>

        <!-- <Poptip confirm title="确认收货了吗?" @on-ok="readyOrder" class="orderButton">
          <Button type="warning" v-if="type=='order' && status==1 " icon="md-alarm">等待同意</Button>
        </Poptip> -->
        <Poptip confirm title="快去送货?"  @on-ok="getMyOrder" class="orderButton">
          <Button type="primary" class="orderButton" v-if="type=='order' && status==1 " >确认收货</Button>
        </Poptip>

        <Button type="warning" class="orderButton" v-if="type=='order' && status==2 " >待评论</Button>


        <Poptip confirm title="确认退单吗?" @on-ok="outOrder" class="orderButton">
          <Button type="primary" v-if="type=='release' && status==0 " icon="md-clock">等待买家</Button>
        </Poptip>

        <Poptip confirm title="快去送货?"  class="orderButton">
          <Button type="primary" v-if="type=='release' && status==1 " icon="md-heart">待送货(快去送货)</Button>
        </Poptip>

        <Poptip confirm title="确认收货了吗?"  class="orderButton">
          <Button type="primary" v-if="type=='release' && status==2 " icon="md-heart">交易完成</Button>
        </Poptip>

        <Poptip confirm title="?" class="checkButton" v-if="type =='manger' && status==-1 ">
          <Button type="primary" icon="md-heart" size="small">通过</Button>
          <Button type="primary" icon="md-heart" size="small">不通过</Button>
        </Poptip>

        <Poptip confirm title="确认了吗？?" class="MangerButton" v-if="type =='manger' && status!=-1 ">
          <Button type="error" icon="md-heart" size="small">下架</Button>
          <Button type="warning" icon="md-heart" size="small">清理</Button>
        </Poptip>
        <!-- <Button
          type="warning"
          class="orderButton"
          v-if="type=='release' && status==2 "
          icon="md-chatboxes"
        >评价</Button> -->
      </Col>
    </Row>
    <Comment :taskId="Info.taskId" v-if="type != 'manger'&& status == 0"></Comment>
 
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
import Comment from './Comment'
const status = {
  0: "待出价",
  1: "待交易",
  2: "已完成",
};
export default {
  props: ["type", "status", "Info","rowStyle"],
  components:{
    Comment
  },
  data() {
    return {
      time: new Date(),
      money: 12,
      pay: 2,
      imgwhich:0
    };
  },
    computed: {
      img() {
       return `http://192.168.43.138:9000/${this.Info.image}`
      },
      style() {
       
        if(this.rowStyle == '1'){
          return 24
        } else {
          return 12
        }
      }
    },
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

.star {
  font-weight: bolder;
  color: red;
  cursor: pointer;
}
.img {
  width: 100%;
}

.checkButton {
/* position: absolute;
  bottom: 10px;
  right: 10px;
  */
}
.storeContent {
  height: 100px;
  max-height: 100px;
}
</style>


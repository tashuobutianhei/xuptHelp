<template>
  <div class="task">
    <Row type="flex" justify="space-between">
      <Col>
        <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
        <span class="nickname">假装有一个名字</span>
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
          <span>假装有一个名字 想吃：</span>东区，一楼那家包子6个肉的加一个燕麦粥
        </p>
      </Col>
      <Col style="margin-top:5px">
        <div class="value">
               <p>
                <span class="span">预计金额：</span>
                ￥{{money}}
                </p>
                <p>
                <span>酬劳：</span>
                ￥{{pay}}
                </p>
                <p>
                <span>预期送达时间：</span>30分钟内
                </p>
                <p>
                <span>收餐地址：</span>东区安悦公寓412
                </p>
                <p>
                <span>联系方式：</span>183xxxx0131
                </p>
        </div>
      </Col>
    </Row>
    <Row type="flex" justify="end">
      <Col>
        <Button type="primary" class="orderButton" v-if="type=='order' && status==0 " icon="md-flag" @click="getOrder">马上接单</Button>
        <Button type="warning" class="orderButton" v-if="type=='order' && status==1 " icon="md-alarm" >已完成（快去完成）</Button>
        <Button type="primary" class="orderButton" v-if="type=='order' && status==2 " disabled>已完成</Button>

        <Poptip confirm title="确认退单吗?" @on-ok="outOrder" class="orderButton">
          <Button type="primary"  v-if="type=='release' && status==0 " icon="md-clock" >待领取</Button>
        </Poptip>

        <Poptip confirm title="确认退单吗?" @on-ok="outOrder" class="orderButton">
          <Button type="primary" class="orderButton" v-if="type=='release' && status==1 " icon="md-heart" >确认收货</Button>
        </Poptip>

        <Button type="warning" class="orderButton" v-if="type=='release' && status==2 " icon="md-chatboxes" >评价</Button>
      </Col>
    </Row>
    <!-- <Row class="comment">
      <div class="commentItem noneComment">
        <p>
          暂时还没有评论
          <span>写下你的看法吧</span>
        </p>
      </div>
      <div class="commentItem">
        <Row type="flex" justify="space-between">
          <Col>
            <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
            <span>假装有一个名字</span>
          </Col>
          <Col>
            <div class="itme">
              <Time :time="time"/>
            </div>
          </Col>
        </Row>
        <Row style="padding:5px 20px">
          <p>假装这是一条评论假装这是一条评论假装这是一条评论假装这是一条评论</p>
        </Row>
        <span class="replay">回复</span>
      </div>
    </Row> -->
  </div>
</template>
<script>
const status = {
  0:'待领取',
  1:'待完成',
  2:'已完成'
}
export default {
  props:["type","status"],
  data() {
    return {
      time: new Date(),
      money: 12,
      pay: 2
    };
  },
  methods:{
    getOrder(){
      this.$emit('getOrder',{})
    },
    outOrder(){
      this.$Message.success('退单成功');
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
    color: coral
}
.orderButton {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>


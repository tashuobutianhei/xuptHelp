<template>
    <div class="comment">
      <div class="commentItem noneComment" v-if="commitList.length == 0">
        <p>
          暂时还没有评论
          <span>写下你的看法吧</span>
        </p>
      </div>
      <div class="commentItem" v-for="(item,index) in commitList">
        <Row type="flex" justify="space-between" :key="index">
          <Col>
            <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
            <span>{{item.nickName}}</span>
          </Col>
          <Col>
            <div class="itme">
              <Time :time="item.time"/>
            </div>
          </Col>
        </Row>
        <Row style="padding:15px 20px">
          <p>{{item.comment}}</p>
        </Row>
        <span class="replay" @click="replay(item)">回复</span>
      </div>
      <div class="replayArea" v-if="wirteVisble || replayVisble">
          <Input type="textarea" v-model="comment" placeholder="说些什么" on-keydown="nobackspace"/>
          <Button type="primary" class="replayButton" @click="readyCommit">确认</Button>
      </div>
    </div>
</template>
<script>
import CONST from '@/common/index.js'
export default {
    props:['wirteVisble'],
    data(){
        // console.log( CONST.foodTask.commentList)
        return {
            time:new Date(),
            commitList: CONST.foodTask.commentList,
            comment:'',
            replayVisble:false
        }
    },
    watch:{
      wirteVisble(now,before){
        if(now){
          this.comment = ""
        }
      }
    },
    methods:{
        replay(item){
            // this.wirteVisble = false;
            this.replayVisble = true;
            this.$emit('changewirteVisble')
            this.comment=`@ ${item.nickName} ：`
        },
        nobackspace(e){
            console.log(111)
            console.log(e)
        },
        readyCommit(){
            this.commitList.push({
                nickName:'xxx',
                comment: this.comment,
                time:new Date(),
            })
            this.comment = '';
        }
    }
}
</script>

<style scoped>
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
  cursor: pointer;
}
.noneComment {
  text-align: center;
}
.nickname {
  color: #666666;
  font-weight: bolder;
}
.replayButton {
    float: right;
}
.replayArea {
    position: relative;
    top:30px;
}
</style>

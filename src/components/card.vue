<template>
    <Card :bordered="true" :padding="14">
      <p slot="title">{{info.name}}</p>
      <div style="display:flex">
        <div class="cardcontent">
          <p>{{info.value}}</p>
        </div>
        <div style="width: 300px; margin-left:50px">
          <transition name="fade">
            <Input v-model="value" placeholder="输入" style="width: 300px" v-show="flag"/>
          </transition>
        </div>
        <Button class="btn" type="primary" @click="flag=!flag">{{info.do}}</Button>
      </div>
    </Card>
</template>
<script>
export default {
    props:['info'],
    data(){
        return {
            flag:false
        }
    }
}
</script>
<style scoped>
.cardcontent {
  width: 150px;
  margin-left: 50px;
  line-height: 31.41px;
}
.btn {
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


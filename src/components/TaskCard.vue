<template>
  <Card>
    <p slot="title">{{ taskList[0].type }}</p>
    <a href="#" slot="extra" @click.prevent="changeLimit">翻页</a>
    <ul>
      <li v-for="item in taskList" style="list-style-type:none">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
        <p>{{ item.taskcontent }}</p>
        <br>
      </li>
    </ul>   
  </Card>
</template>
<script>
    export default {
        data () {
            return {
                taskList: [
                    {
                        name: '任务名',
                        type:"外卖",
                        url: 'https://movie.douban.com/subject/1292052/',
                        taskcontent: "任务内容"
                    },                    {
                        name: '任务名',
                        type:"外卖",
                        url: 'https://movie.douban.com/subject/1292052/',
                        taskcontent: "任务内容"
                    },                    {
                        name: '任务名',
                        type:"外卖",
                        url: 'https://movie.douban.com/subject/1292052/',
                        taskcontent: "任务内容"
                    },                    {
                        name: '任务名',
                        type:"外卖",
                        url: 'https://movie.douban.com/subject/1292052/',
                        taskcontent: "任务内容"
                    },
                ],
            }
        },
        methods: {
            changeLimit () {
            }
        },
        mounted () {
            this.changeLimit();
        }
    }
</script>

<style scoped>

</style>

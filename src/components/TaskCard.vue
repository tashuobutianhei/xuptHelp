<template>
  <Card>
    <p slot="title">{{ info[0].type }}</p>
    <a href="#" slot="extra" @click.prevent="changeLimit">翻页</a>
    <ul>
      <li v-for="item in info" :key="item.id" style="list-style-type:none">
        <a :href="item.url" target="_blank">{{ item.name }}</a>
        <p>{{ item.taskcontent }}</p>
        <br>
      </li>
    </ul>   
  </Card>
</template>
<script>
    export default {
        props:['info'],
        data () {
            return {
            }
        },
        methods: {
            changeLimit () {
            }
        },
    }
</script>

<style scoped>

</style>

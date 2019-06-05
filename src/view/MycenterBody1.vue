<template>
  <div class="content">
    <Card :bordered="true" :padding="16">
      <p slot="title">用户名</p>
      <p style="margin-left:50px; margin-right:135px">dalao</p>
    </Card>
    <Card :bordered="true" :padding-top="20">
      <p slot="title">个人头像</p>
      <div style="display: flex">
        <div class="face">
          <img src alt="个人头像">
        </div>
        <Button type="primary" style="margin:auto">修改头像</Button>
      </div>
    </Card>

    <Card :bordered="true" :padding="30">
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
    </Card>
    <Card :bordered="true" :padding="30">
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
    </Card>
    <Card :bordered="true" :padding="30">
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
    </Card>
  </div>
</template>
<script>
export default {};
</script>
<style>
.content {
  margin-left: 1px;
  height: 100%;
  background-color: #fff;
}

.face {
  height: 70px;
  width: 70px;
  margin-left: 50px;
  margin-right: 100px;
  background-color: gold;
}
</style>


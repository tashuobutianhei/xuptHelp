<template>
  <Row>
    <Col span="8">
      <taskcard></taskcard>
    </Col>
    <Col span="8" offset="0">
      <taskcard></taskcard>
    </Col>
    <Col span="8" offset="0">
      <taskcard></taskcard>
    </Col>
  </Row>
</template>
<script>
import taskcard from "../components/TaskCard";

export default {
  components: {
    taskcard
  }
};
</script>
<style scoped>
</style>

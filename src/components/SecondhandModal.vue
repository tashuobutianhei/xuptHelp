<template>
  <div>
    <Modal v-model="modalVisble" title="商品信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="给一个好的标题吧！"></Input>
        </FormItem>
        <FormItem label="电话" prop="tel">
          <Input v-model="formValidate.tel" placeholder="电话走一波"></Input>
        </FormItem>
        <FormItem label="入手价格" prop="oldprice">
          <InputNumber v-model="formValidate.oldprice"></InputNumber>
        </FormItem>
        <FormItem label="出手价格" prop="newprice">
          <InputNumber v-model="formValidate.newprice"></InputNumber>
        </FormItem>
<!-- action="//jsonplaceholder.typicode.com/posts/" -->
        <FormItem label="图片" prop="img">
          <Upload multiple  show-upload-list action="" @before-upload="getimg">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>

        <FormItem label="商品具体描述" prop="content">
          <Input
            v-model="formValidate.content"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="商品具体描述..."
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["modalVisble"],
  data() {
    return {
      numberMax: 10,
      numberMin: 2,
      formValidate: {
        title: "",
        tel: "",
        oldprice: 0,
        newprice: 0,
        content: "",
        img: ""
      },
      ruleValidate: {
        img: [
          {
            required: true,
            message: "图片",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "标题",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "联系方式",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        oldprice: [
          {
            required: true,
            message: "多钱买的",
            trigger: "change"
          }
        ],
        newprice: [{ required: true, message: "价格多少", trigger: "change" }],
        content: [
          {
            required: true,
            message: "商品信息",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      this.$emit("close");
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$emit("close");
      this.$Message.info("Clicked cancel");
    },
    getimg(a,b,c){
      console.log(a,b,c)
    }
  }
};
</script>

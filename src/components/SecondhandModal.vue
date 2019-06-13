<template>
  <div>
    <Modal v-model="visible" title="商品信息" @on-ok="ok" @on-cancel="cancel">
      <div slot="footer">
        <Button type="primary" size="large" long @click="ok">确认添加</Button>
      </div>
      <p style="display:none">{{visibleComputed}}</p>
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
          <Upload multiple show-upload-list action :before-upload="getimg">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          <p v-if="file">
            <Icon type="md-cloud-upload"/>
            {{file.name}}
          </p>
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
  computed: {
    visibleComputed() {
      this.visible = this.modalVisble;
      return this.modalVisble;
    }
  },
  data() {
    return {
      file: "",
      visible: false,
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
        // img: [
        //   {
        //     required: true,
        //     message: "图片",
        //     trigger: "blur"
        //   }
        // ],
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
          }
        ],
        // oldprice: [
        //   {
        //     required: true,
        //     message: "多钱买的",
        //     trigger: "change"
        //   }
        // ],
        // newprice: [{ required: true, message: "价格多少", trigger: "change" }],
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
          if (this.$store.state.islogin) {
            var params = new FormData();
            params.append("title", this.formValidate.title);
            params.append("content", this.formValidate.content);
            params.append("oldPrice", this.formValidate.oldprice);
            params.append("newPrice", this.formValidate.newprice);
            params.append("file", this.file);
            params.append("phone", this.formValidate.tel);

            this.axios({
              method: "post",
              url: "http://192.168.43.138:9000/trade/",
              headers: { "Content-Type": "multipart/form-data" },
              data: params
            }).then(res => {
              if (res.data == "success") {
                this.$Message.success("添加成功!");
                this.$emit("close");
                this.handleReset(name);
              }
            });
          } else {
            this.$Message.error("先登录吧!");
            this.handleReset(name);
          }
        } else {
          this.$Message.error("存在错误信息o!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      this.handleSubmit("formValidate");
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$emit("close");
      this.$Message.info("Clicked cancel");
    },
    getimg(a, b, c) {
      console.log(a);
      this.file = a;
    }
  }
};
</script>

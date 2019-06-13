<template>
  <div>
    <Modal
      v-model="visible"
      title="订单信息"
      @on-ok="ok"
      @on-cancel="cancel"
      :loading="loginloading"
      :mask-closable="false"
    >
      <div slot="footer">
        <Button type="primary" size="large" long @click="ok">确认添加</Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="地址"></Input>
        </FormItem>
        <p style="display:none">{{visibleComputed}}</p>
        <FormItem label="电话" prop="tel">
          <Input v-model="formValidate.tel" placeholder="电话走一波"></Input>
        </FormItem>
        <FormItem label="支付酬劳" prop="pay">
          <InputNumber v-model="formValidate.pay" :max="numberMax" :min="numberMin"></InputNumber>
        </FormItem>
        <FormItem label="预估价格" prop="money">
          <InputNumber v-model="formValidate.money"></InputNumber>
        </FormItem>
        <FormItem label="送达时间" prop="time">
          <TimePicker v-model="formValidate.time" format="HH:mm" placeholder="能接受多久送达"></TimePicker>
        </FormItem>
        <FormItem label="吃啥" prop="food">
          <Input
            v-model="formValidate.food"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="好好说要吃啥..."
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
      visible: false,
      loginloading: true,
      numberMax: 10,
      numberMin: 2,
      formValidate: {
        address: "",
        tel: "",
        pay: 2,
        money: 0,
        time: "",
        food: ""
      },
      ruleValidate: {
        address: [
          {
            required: true,
            message: "地址必填哦",
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
        // pay: [
        //   {
        //     required: true,
        //     message: "你要支付多少呀",
        //     trigger: "blur"
        //   }
        // ],
        // money: [{ required: true, message: "给个参考吧", trigger: "blur" }],
        food: [
          {
            required: true,
            message: "你吃撒",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "多久送到",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    transform(time) {
      let date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      let timestep =
        1000 * 1 * 60 * Number(time.split(":")[1]) +
        1000 * 1 * 60 * 60 * Number(time.split(":")[0]);
      return date.getTime() + timestep;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        // this.transform(this.formValidate.time);
        if (valid) {
          if (this.$store.state.islogin) {
            this.axios({
              method: "post",
              url: "http://192.168.43.138:9000/food/",
              data: {
                address: this.formValidate.address,
                phone: this.formValidate.tel,
                pay: this.formValidate.pay,
                cost: this.formValidate.money,
                description: this.formValidate.food,
                time: this.transform(this.formValidate.time)
              }
            }).then(res => {
              if (res.data == "success") {
                this.$Message.success("添加成功!");
                this.$emit("refresh");

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
      // this.$emit('close')
      this.handleSubmit("formValidate");
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$emit("close");
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>

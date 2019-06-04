<template>
  <div>
     <Modal v-model="modalVisble" title="订单信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="地址"></Input>
        </FormItem>
        <FormItem label="电话" prop="tel">
          <Input v-model="formValidate.tel" placeholder="电话走一波"></Input>
        </FormItem>
        <FormItem label="支付酬劳" prop="pay">
            <InputNumber v-model="formValidate.pay"  :max="numberMax" :min="numberMin"></InputNumber>
        </FormItem>
        <FormItem label="预估价格" prop="money">
            <InputNumber v-model="formValidate.money" ></InputNumber>
        </FormItem>
        <FormItem label="送达时间" prop="time">
            <TimePicker  v-model="formValidate.time" format="HH:mm" placeholder="能接受多久送达" ></TimePicker>
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
  props:['modalVisble'],
  data() {
    return {
      numberMax:10,
      numberMin:2,
      formValidate: {
        address: "",
        tel: "",
        pay:0,
        money: 0,
        time:"",
        food: "",
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
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        pay: [
          {
            required: true,
            message: "你要支付多少呀",
            trigger: "change"
          }
        ],
        money: [
          { required: true, message: "给个参考吧", trigger: "change" }
        ],
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
      this.$emit('close')
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$emit('close')
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>

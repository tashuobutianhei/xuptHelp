<template>
    <div>
        <Tabs :value="TabsValue" class="content">
            <TabPane label="待领取订单" name="wait">
                    <FoodTask class="task" type="order" status="0" @getOrder="getOrder"></FoodTask>
                    <FoodTask class="task" type="order" status="0" @getOrder="getOrder"></FoodTask>
                    <FoodTask class="task" type="order" status="0" @getOrder="getOrder"></FoodTask>
                    <FoodTask class="task" type="order" status="0" @getOrder="getOrder"></FoodTask>
            </TabPane>
            <TabPane label="我的足迹" name="my">
                <Row>
                    <Col span="12" class="myeat">
                        <P>我发布的</P>
                        <FoodTask class="mytask" type="release" status="0"></FoodTask>
                        <FoodTask class="mytask" type="release" status="1"></FoodTask>
                        <FoodTask class="mytask" type="release" status="2"></FoodTask>
                    </Col>
                    <Col span="12" class="myget">
                        <P>我的领取</P>
                        <FoodTask class="mytask" type="order" status="0" ></FoodTask>
                        <FoodTask class="mytask" type="order" status="1" ></FoodTask>
                        <FoodTask class="mytask" type="order" status="2" ></FoodTask>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
         <Tooltip content="饿了就下单吧" placement="top"  class="addbutton">
             <Button type="primary" shape="circle" icon="md-add" @click="modalVisble=true"></Button>
        </Tooltip>
        
        <FoodOrderModal  :modalVisble="modalVisble" @close="close"></FoodOrderModal>

         <Modal
            v-model="readyModalVisble"
            title="确认一下"
            @on-ok="getOrderOk"
            @on-cancel="getOrderCancel">
            <p>确认领取了吗？要负责哦！</p>
        </Modal>
    </div>
</template>
<script>
import FoodTask from '../components/FoodTask'
import FoodOrderModal from '../components/FoodOrderModal'
export default {
    components:{
        FoodTask,FoodOrderModal
    },
    data(){
        return{
            modalVisble:false,
            TabsValue:'wait',
            readyModalVisble:false,
        }
        
    },
    methods:{
        close(){
            this.modalVisble = false;
        },
        getOrder(){
            this.readyModalVisble = true;
        },
        getOrderOk(){
            //axios 订单领取
            this.$Message.success('领取成功');
            this.readyModalVisble = false;
        },
        getOrderCancel(){
            this.readyModalVisble = false;
        }
    }
}
</script>
<style scoped>
.content {
      background: white;
        min-height: 800px;
        margin: 30px 100px;
}
.task{
    width: 70%;
    margin: 15px auto;
}
.FoodOrderModal{
    width: 50%;
    margin: 15px auto;
}
.addbutton{
    position: fixed;
    top: 100px;
    right: 50px;
}
.myeat{
    border-right: 1px red solid;
}
.myeat p,.myget p{
    text-align: center;
    width: 100%;
}
</style>

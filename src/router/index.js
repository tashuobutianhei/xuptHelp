import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home.vue'
import Food from '@/view/Food.vue'
import Mail from '@/view/Mail.vue'
import SecondHand from '@/view/SecondHand.vue'
import Mycenter from '@/view/Mycenter.vue'
import Manger from '@/view/Manger.vue'

import MycenterBody1 from '@/view/MycenterBody1'
import MycenterBody2 from '@/view/MycenterBody2'
import MangerCheck from '@/view/MangerCheck.vue'
import MangerManger from '@/view/MangerManger.vue'
import MangerComment from '@/view/MangerComment.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/Food',
        name: 'Food',
        component: Food
    }, {
        path: '/Mail',
        name: 'Mail',
        component: Mail
    }, {
        path: '/SecondHand',
        name: 'SecondHand',
        component: SecondHand
    }, {
        path: '/Manger',
        name: 'Manger',
        component: Manger,
        children: [{
            path: 'MangerCheck',
            name: 'MangerCheck',
            component: MangerCheck,
        },
        {
            path: 'MangerManger',
            name: 'MangerManger',
            component: MangerManger,
        }, {
            path: 'MangerComment',
            name: 'MangerComment',
            component: MangerComment,
        }
        ]
    },
    {
        path: '/Mycenter',
        name: 'Mycenter',
        component: Mycenter,
        children: [{
            path: 'MycenterBody1',
            name: 'MycenterBody1',
            component: MycenterBody1,
        },
        {
            path: 'MycenterBody2',
            name: 'MycenterBody2',
            component: MycenterBody2,
        },
        ]
    }
    ]
})
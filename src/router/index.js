import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'
import Plans from '../views/Plans.vue'
import Plan from '../views/Plan.vue'
import PlanForm from '../views/PlanForm.vue'
import MyPage from '../views/MyPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: Addresses
  },
  {
    path: '/addresses/:address_id?/edit',
    name: 'address_edit',
    component: AddressForm
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/plans/:plan_id?',
    name: 'plan',
    component: Plan
  },
  {
    path: '/plans/:plan_id?/edit',
    name: 'plan_edit',
    component: PlanForm
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
const CatalogView = () => import('../views/CatalogView.vue')
const CardView = () => import('../views/CardView.vue')
const TestView = () => import('../views/TestView.vue')
const InfoView = () => import('../views/InfoView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/form',
    name: 'form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/FormView.vue')
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    props: true,
    component: CardView
  },
  {
    path: '/test',
    name: 'TheTest',
    component: TestView
  },
  {
    path: '/info',
    name: 'TheInfo',
    component: InfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

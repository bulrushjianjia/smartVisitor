import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const App = () => import('@/App')
const VisitRequest = () => import('@/view/visit/Request')
const VisitRequestPage = () => import('@/view/visit/RequestPage')
const PersonalCenterIndex = () => import('@/view/personalCenter/Index')
const PersonalCenterInfo = () => import('@/view/personalCenter/Info')
const VisitForm = () => import('@/view/visit/Form')
const VisitList = () => import('@/view/visit/List')
const VisitInfo = () => import('@/view/visit/Info')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/VisitRequest',
      component: VisitRequest
    },
    {
      path: '/PersonalCenterIndex',
      name: 'PersonalCenterIndex',
      component: PersonalCenterIndex
    },
    {
      path: '/PersonalCenterInfo',
      component: PersonalCenterInfo
    },
    {
      path: '/VisitList/:type',
      component: VisitList
    },
    {
      path: '/VisitForm/:type',
      component: VisitForm,
      props: (route) => ({
        query: route.query
      }),
    },
    {
      path: '/VisitInfo/:type',
      component: VisitInfo,
      // props: (route) => ({
      //   query: route.query
      // })
    },
    {
      name: "RequestPage",
      path: '/RequestPage',
      component: VisitRequestPage
    }
  ]
})

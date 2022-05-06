import Vue from 'vue'
import Router from 'vue-router'
import store  from "../store"

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Home = () => import('@/views/pages/Home')
const Login = () => import('@/views/pages/Login')
const RegisterHeader = () => import('@/views/pages/header')
const Register = () => import('@/views/pages/Register')
const Register1 = () => import('@/views/pages/Register1')
const Register2 = () => import('@/views/pages/Register2')
const Register3 = () => import('@/views/pages/Register3')
const RegisterSuccess = () => import('@/views/pages/RegisterSuccess')
const RegisterFailed = () => import('@/views/pages/RegisterFailed')

// Views - Main
const MainHome = () => import('@/views/main/MainHome')
const GenNewGroup = () => import('@/views/main/GenNewGroup')
const GenGroupSuccess = () => import('@/views/main/GenGroupSuccess')
const JoinGroup = () => import('@/views/main/JoinGroup')
const CheckGroup = () => import('@/views/main/CheckGroup')
const JoinGroupSuccess = () => import('@/views/main/JoinGroupSuccess')
const CameraTest = () => import('@/views/main/CameraTest')



// Views - Matching
const MatchingCategory = () => import('@/views/matching/MatchingCategory')
const CategoryView = () => import('@/views/matching/CategoryView')
const CategoryMyUniv = () => import('@/views/matching/CategoryMyUniv')
const ViewPost = () => import('@/views/matching/ViewPost')
const NewPost = () => import('@/views/matching/NewPost')
const View404 = () => import('@/views/matching/View404')

// Views - MyPages
const MyAccount = () => import('@/views/myPages/MyAccount')
const MyRecvList = () => import('@/views/myPages/MyRecvList')
const MyApplyList = () => import('@/views/myPages/MyApplyList')
const MyPostList = () => import('@/views/myPages/MyPostList')

// Views - Message
const MessageHome = () => import('@/views/message/MessageHome')
const ChatView = () => import('@/views/message/ChatView')


// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

import http from "../http"

const beforeAuth = isAuth => (from, to, next) => {
  const isAuthenticated = store.getters["isAuthenticated"]
  if ((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {
    http.post('/users/refresh', {
      userId: store.getters.getUserInfo.userId
    }).then((res) => {
      if (res.status === 200) { 
        if(!res.data.state){
          return next("/pages/login")
        }
        if(res.data.state == true){
          console.log(res.data.refreshed + " refreshed")
          if (res.data.refreshed == 'access'){
            store.commit("refreshToken", res.data.newToken);
          }
          return next()
        }
        else{
          store.commit('set', ['sidebarShow', false])
          store.dispatch("logout", {})
          .then(() => {return next("/pages/login")})
          .catch(({ message }) => alert(message))
        }
      }
      }
      ).catch(function (error){
        console.log(error)
    })
  } else {
    next("/pages/login")
  }
}

Vue.use(Router)


export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/pages/home',
      name: 'InitialPage',
      component: TheContainer,
      children: [
        {
          path: 'main',
          redirect: '/main/MainHome',
          name: 'Main',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/main/MainHome',
              name: 'MainHome',
              component: MainHome,
              meta: { text: "main_home" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/GenNewGroup',
              name: 'GenNewGroup',
              component: GenNewGroup,
              meta: { text: "gen_new_group" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/GenGroupSuccess',
              name: 'GenGroupSuccess',
              component: GenGroupSuccess,
              meta: { text: "gen_group_success" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/JoinGroup',
              name: 'JoinGroup',
              component: JoinGroup,
              meta: { text: "join_group" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/CheckGroup',
              name: 'CheckGroup',
              component: CheckGroup,
              meta: { text: "check_group" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/JoinGroupSuccess',
              name: 'JoinGroupSuccess',
              component: JoinGroupSuccess,
              meta: { text: "join_group_success" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/main/CameraTest',
              name: 'CameraTest',
              component: CameraTest,
              meta: { text: "CameraTest" },
              //beforeEnter: beforeAuth(true)
            },
          ]
        },





        {
          path: 'matching',
          redirect: '/matching/MatchingCategory',
          name: 'Matching',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/matching/MatchingCategory',
              name: 'MatchingCategory',
              component: MatchingCategory,
              meta: { text: "matching_home" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/matching/CategoryView',
              name: 'CategoryView',
              component: CategoryView,
              meta: { text: "in_category" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/matching/CategoryMyUniv',
              name: 'CategoryMyUniv',
              component: CategoryMyUniv,
              meta: { text: "in_category" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/matching/ViewPost',
              name: 'ViewPost',
              //component: ViewPost,
              props: true,
              meta: { text: "view_post_" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/matching/NewPost',
              name: 'NewPost',
              component: NewPost,
              meta: { text: "new_post" },
              //beforeEnter: beforeAuth(true)
            },
            {
              path: '/matching/view404',
              name: 'View404',
              component: View404,
              meta: { text: "view_404" },
              //beforeEnter: beforeAuth(true)
            },
          ]
        },
        {
          path: 'myPages',
          redirect: '/myPages/MyAccount',
          name: 'MyPages',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'MyAccount',
              name: 'MyAccount',
              component: MyAccount,
              meta: { text: "my_account" },
              beforeEnter: beforeAuth(true)
            },
            {
              path: 'MyApplyList',
              name: 'MyApplyList',
              component: MyApplyList,
              meta: { text: "my_apply_list" },
              beforeEnter: beforeAuth(true)
            },
            
            {
              path: 'MyRecvList',
              name: 'MyRecvList',
              component: MyRecvList,
              meta: { text: "my_recv_list" },
              beforeEnter: beforeAuth(true)
            },
            {
              path: 'MyPostList',
              name: 'MyPostList',
              component: MyPostList,
              meta: { text: "my_post_list" },
              beforeEnter: beforeAuth(true)
            },
          ]
        },
        {
          path: 'message',
          redirect: '/message/messageHome',
          name: 'Message',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'messageHome',
              name: 'MessageHome',
              component: MessageHome,
              meta: { text: "message" },
              beforeEnter: beforeAuth(true)
            },
            {
              path: 'chatView',
              name: 'ChatView',
              component: ChatView,
              meta: { text: "chatview" },
              beforeEnter: beforeAuth(true)
            },
          ]
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') },
        RegisterHeader
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404,
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500,
        },
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: { page: 0 },
          //beforeEnter: beforeAuth(false)
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: { text: 'login', page: 1 },
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: { page: 2 },
        },
        {
          path: 'register1',
          name: 'Register1',
          component: Register1,
          meta: { page: 2 },
        },
        {
          path: 'register2',
          name: 'Register2',
          component: Register2,
          meta: { page: 3 }
        },
        {
          path: 'register3',
          name: 'Register3',
          component: Register3,
          meta: { page: 4 },
        },
        {
          path: 'register_success',
          name: 'RegisterSuccess',
          component: RegisterSuccess,
          meta: { page: 5 },
        },
        {
          path: 'register_failed',
          name: 'RegisterFailed',
          component: RegisterFailed,
          meta: { page: 5 },
        }
      ]
    }
  ]
}


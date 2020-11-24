import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/index'
import Login from '@/views/login'



Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      redirect: '/general_search',
      children: [
        {
          path: '/general_search',
          name: '普通搜索',
          component: () => import('@/views/search/generalSearch'),
        },
        {
          path: '/advanced_search',
          name: '高级搜索',
          component: () => import('@/views/search/advancedSearch'),
        },
        {
          path: '/personal_tag',
          name: '个人标签管理',
          component: () => import('@/views/searchManagement/personalTag'),
        },
        {
          path: '/search_history',
          name: '搜索履历管理',
          component: () => import('@/views/searchManagement/searchHistory'),
        },
        {
          path: '/search_help',
          name: '搜索帮助',
          component: () => import('@/views/searchHelp/index'),
        },
        {
          path: '/user_management',
          name: '用户管理',
          component: () => import('@/views/systemManagement/userManagement'),
        },
        {
          path: '/role_management',
          name: '角色管理',
          component: () => import('@/views/systemManagement/roleManagement'),
        },
        {
          path: '/access_management',
          name: '访问权限管理',
          component: () => import('@/views/systemManagement/accessManagement'),
        },
        {
          path: '/search_history_management',
          name: '搜索履历',
          component: () => import('@/views/systemManagement/searchHistoryManagement'),
        },
        {
          path: '/background_plan_config',
          name: '后台计划配置',
          component: () => import('@/views/systemManagement/backgroundPlanConfig'),
        },
        {
          path: '/query_result_analysis',
          name: '查询结果分析',
          component: () => import('@/views/systemManagement/queryResultAnalysis'),
        }

      ],

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

  ]
})

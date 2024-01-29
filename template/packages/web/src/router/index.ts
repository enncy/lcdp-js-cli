import Index from '@/views/Index.vue'
import { createSchemaRoutes } from '@lcdp-js/web'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import SchemaTablePage from '../components/SchemaTablePage.vue'
import { schema_data } from '@/apis'

export const schema_routes = createSchemaRoutes(schema_data?.schema_metadata_list || [], {
  /** 默认显示组件，可以使用 override 覆盖 */
  base_component: SchemaTablePage,
  override: [
    // ["User", ()=> import('xxx.vue')]
  ],
  /**
   * 后台路由菜单结构
   */
  menus_structure: [
    /** 用户列表 */
    'User',
    {
      group_icon: 'icon-user',
      group_name: '分组测试',
      /** 用户列表 */
      children: ['User']
    }
  ]
})

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: schema_routes[0]?.path || '/',
    component: Index,
    children: [...schema_routes]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router

import Index from '@/views/Index.vue'
import { createSchemaRoutes } from '@lcdp-js/web'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import SchemaTablePage from '../components/SchemaTablePage.vue'
import { schema_data } from '@/apis'

export const schema_routes = createSchemaRoutes(schema_data.routes, SchemaTablePage)

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin',
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

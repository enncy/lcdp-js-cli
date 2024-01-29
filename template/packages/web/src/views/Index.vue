<template>
  <a-layout class="layout-base">
    <a-layout-header class="d-flex border-bottom layout-base-header">
      <h1><b> lcdp-js </b></h1>
    </a-layout-header>

    <a-layout class="layout-base-container">
      <!-- 如果不想使用侧边栏可以直接覆盖此插槽 -->

      <a-layout-sider theme="light" breakpoint="lg" :width="220">
        <Menu class="sider-meuns mt-3" :routes="currentChildren"></Menu>
      </a-layout-sider>
      <a-layout-content class="layout-base-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { routes } from '../router'
import { Menu } from '@lcdp-js/web'

const router = useRouter()

// 顶部实体路由
const currentTopSchemaRoute = computed(() =>
  routes.find((r) => r.name === router.currentRoute.value.matched[0]?.name)
)

// 当前实体路由下的子路由
const currentChildren = computed(() => currentTopSchemaRoute.value?.children || [])
</script>

<style scoped lang="less">
@header-height: 48px;

.layout-base {
  display: grid;
  grid-template-rows: @header-height calc(100vh - @header-height);
  grid-template-areas:
    'header'
    'main ';
}

.layout-base-header {
  height: @header-height;
  display: flex;
  align-items: center;
  padding-left: 32px;
}
.layout-base-content {
  background-color: #f4f4f4;
  padding: 12px 24px;
}
</style>

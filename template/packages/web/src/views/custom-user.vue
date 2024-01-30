<template>
  <div v-if="current_schema_route" class="bg-white">
    <SchemaTable
      class="schema"
      :apis="apis"
      :schema-route="current_schema_route"
      :empty-value-render="() => '---'"
      :enable-search="true"
      :enable-table-operate="true"
      :roles="['create', 'details', 'modify', 'remove']"
    >
      <!-- 自定义 用户列表页面 -->
    </SchemaTable>
  </div>
</template>

<script setup lang="ts">
import { SchemaTable } from '@lcdp-js/web'
import { apis } from '../apis/index'
import { findRouteBySchemaName } from '../router/index'

const current_schema_route = findRouteBySchemaName('User')
</script>

<style scoped lang="less">
.schema {
  background-color: #f4f4f4;
}
</style>

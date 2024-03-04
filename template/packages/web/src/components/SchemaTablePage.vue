<template>
  <div v-if="current_schema_route" class="bg-white">
    <SchemaTable
      class="schema"
      :apis="apis"
      :schema-route="current_schema_route"
      :enable-search="true"
      :enable-table-operate="true"
      :roles="['create', 'details', 'modify', 'remove']"
    >
    </SchemaTable>
  </div>
</template>

<script setup lang="ts">
import { SchemaTable } from '@lcdp-js/web'
import { apis } from '../apis/index'
import { findCurrentSchemaRoute } from '../router/index'

/**
 * 当前路由所带的对象参数
 */
const current_schema_route = findCurrentSchemaRoute()
</script>

<style scoped lang="less">
.schema {
  background-color: #f4f4f4;
}
</style>

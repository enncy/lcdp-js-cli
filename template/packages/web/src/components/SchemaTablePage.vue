<template>
  <div v-if="current_schema_route" class="bg-white">
    <SchemaTable class="schema" :apis="apis" :schema-route="current_schema_route"></SchemaTable>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SchemaTable } from '@lcdp-js/web'
import { computed } from 'vue'
import { schema_routes } from '@/router'
import { apis } from '../apis/index'

const router = useRouter()

/**
 * 当前路由所带的对象参数
 */
const current_schema_route = computed(() =>
  schema_routes
    .map((sr) => sr.children || [])
    .flat()
    .find((sr) => sr.path === router.currentRoute.value.path)
)
</script>

<style scoped lang="less">
.schema {
  background-color: #f4f4f4;
}
</style>

<template>
  <div v-if="schema_data_error">
    <a-alert type="error" show-icon>
      <template #message>
        <span>获取 schema 数据失败</span>
      </template>
    </a-alert>
  </div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { schema_data } from './apis'

const schema_data_error = !schema_data
</script>

<style scoped></style>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'

export default {
  name: 'COVID19',
  components: { ...components }
}
</script>

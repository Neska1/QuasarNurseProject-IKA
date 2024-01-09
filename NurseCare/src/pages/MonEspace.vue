<template>
  <q-page class="row items-center justify-evenly">
    <p>Mon espace</p>
  </q-page>

  <div id="q-app" style="min-height: 100vh;">
<div class="q-pa-md q-gutter-md">
    <div class="row justify-between">

    <q-parallax
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <h1 class="text-white">Salut ! </h1>
    </q-parallax>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MonEspace'
})
</script>

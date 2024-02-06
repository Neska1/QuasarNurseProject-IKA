<template>
  <q-page class="home-accueil row items-center justify-evenly">
    <h5 class="title-container text-h4 q-my-md">
      <br>
      Bienvenue sur NurseCare, l'outil qui se soucie de vous.
    </h5>

    <q-parallax class="my-parallax" src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
      <div class="text-h3 text-white text-center">
      </div>
    </q-parallax>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeAccueil'
})
</script>

<style>
.home-accueil .title-container {
  text-align: center;
  color: #229085; /* Adjust the color as needed */
}

.my-parallax {
  min-width: 150%; /* Adjust the width as needed */
  margin: auto;
}

/* Add more styles here as needed */
</style>

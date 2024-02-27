<template>
  <q-page class="home-accueil">
    <div
      class="center"
      :width="500"
    >
      <img
        class="img-home-ban"
        src="src/assets/bandef2.png"
      >
    </div>
    <h3 class="title-container text-h4 q-my-md">
      <br>
      Bienvenue sur NurseCare, l'outil qui se soucie de vous.
    </h3>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeAccueil',
  mounted () {
    const titleContainer = this.$el.querySelector('.title-container')
    const image = this.$el.querySelector('.img-home-ban')
    if (titleContainer) {
      titleContainer.classList.add('appear')
    }

    if (image) {
      setTimeout(() => {
        image.classList.add('appear')
      }, 150)
    }
  }
})
</script>

<style>
.home-accueil .title-container {
  text-align: center;
  color: #229085;
  font-family: 'Poppins', sans-serif;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.home-accueil .title-container.appear {
  opacity: 1;
}

.img-home-ban {
  width: 100%;
  max-width: 1350px;
  height: auto;
  display: block;
  margin: 0 auto;
  opacity: 0;
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.img-home-ban.appear {
  opacity: 1;
  transform: scale(1);
}
</style>

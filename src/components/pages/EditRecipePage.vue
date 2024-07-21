<template>
  <main>
    <div class="container-md my-5 py-5">
      <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
    </div>
  </main>
</template>
<script setup>
import RecipeForm from "../recipeForm/RecipeForm.vue";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const detailData = ref(null);
const isLoading = ref(false);
const store = useStore();
const route = useRoute();

onMounted(async () => {
  console.log(route.params.id);
  isLoading.value = true;

  await store.dispatch("recipe/getRecipeDetail", route.params.id);
  detailData.value = store.state.recipe.recipeDetail;
  isLoading.value = false;
});
</script>

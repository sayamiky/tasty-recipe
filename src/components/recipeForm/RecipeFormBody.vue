<template>
  <li class="list-group-item">
    <!-- M37 @submit.prevent="addNewRecipe" -->
    <form @submit.prevent="addNewRecipe">
      <!-- General Information Start -->
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <!-- Image Start -->
          <div class="mb-3">
            <!-- 1 -->
            <base-input
              type="file"
              identity="recipeImage"
              label="Photo Recipe"
              @input="checkImage"
            ></base-input>
            <div>
              <img
                :src="recipeData.imageLink"
                :alt="recipeData.name"
                class="image"
                style="object-fit: cover; width: 100px; height: 100px"
              />
            </div>
          </div>
          <!-- Image End -->

          <!-- Recipe Title Start -->
          <div class="mb-3">
            <!-- 2 -->
            <base-input
              type="text"
              identity="recipeTitle"
              placeholder="Give your recipe a title"
              label="Recipe Title"
              v-model="recipeData.name"
            ></base-input>
          </div>
          <!-- Recipe Title  End -->

          <!-- Recipe Description Start -->
          <div class="mb-3">
            <!-- 3 -->
            <base-text-area
              identity="recipeDescription"
              label="Description"
              placeholder="Share story behind recipe and what is make it special"
              v-model="recipeData.description"
            ></base-text-area>
          </div>
          <!-- Recipe Description End -->

          <!-- Recipe Cateogry Start -->
          <div class="mb-3">
            <!-- 4 -->
            <base-select
              :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']"
              identity="recipeType"
              label="Recipe Type"
              v-model="recipeData.category"
              @change="changeRecipeType"
            ></base-select>
          </div>
          <!-- Recipe Category End -->
        </div>
      </div>
      <!-- General Information End -->

      <!-- Time Setting Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <!-- Preparation Time Start -->
          <div class="mb-3">
            <!-- 5 -->
            <base-input
              type="number"
              identity="prepTime"
              placeholder="0"
              label="Prep Time"
              v-model="recipeData.prepTime"
            ></base-input>
          </div>
          <!-- Preparation Time End -->

          <!-- Cook Time Start -->
          <div class="mb-3">
            <!-- 6 -->
            <base-input
              type="number"
              identity="cookTime"
              placeholder="0"
              label="Cook Time"
              v-model="recipeData.cookTime"
            ></base-input>
          </div>
          <!-- Cook Time End -->

          <!-- Total Time Start -->
          <div class="mb-3">
            <!-- 7 -->
            <base-input
              type="number"
              identity="totalTime"
              placeholder="0"
              label="Total Time"
              v-model="recipeData.totalTime"
              @totalTimeFocus="totalTime"
              readonly="1"
            ></base-input>
          </div>
          <!-- Total Time End -->
        </div>
      </div>
      <!-- Time Setting End -->

      <!-- Ingredients Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups,
          tablespoons) and any special preparation (i.e. sifted, softened,
          chopped). Use optional headers to organize the different parts of the
          recipe (i.e. Cake, Frosting, Dressing).
        </p>
        <div>
          <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
            <!-- Ingredient Input Start -->
            <div class="col-lg-11 col-11">
              <!-- 8 -->
              <base-input
                type="text"
                identity="ingredient"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.ingredients[count - 1]"
              ></base-input>
            </div>
            <!-- Ingredient Input End -->
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31"
              v-if="ingredientCount > 1"
              @click="deleteIngredient(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <!-- Add More Button Start -->
        <!-- 9 -->
        <base-button
          class="new-ingredient-btn px-3 py-2"
          type="button"
          @clickButton="addIngredient"
        >
          Add More
        </base-button>
        <!-- Add More Button Start -->
      </div>
      <!-- Ingredients End -->

      <!-- Direction Start -->
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>
          Explain how to make your recipe, including oven temperatures, baking
          or cooking times, and pan sizes, etc. Use optional headers to organize
          the different parts of the recipe
        </p>
        <div>
          <div class="mb-3 row" v-for="count in directionCount" :key="count">
            <!-- Direction Input Start -->
            <div class="col-lg-11 col-11">
              <!-- 10 -->
              <base-input
                type="text"
                identity="direction"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.directions[count - 1]"
              ></base-input>
            </div>
            <!-- Direction Input End -->
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31"
              v-if="directionCount > 1"
              @click="deleteDirection(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <!-- Add More Button Start -->
        <!-- 11 -->
        <base-button
          class="new-ingredient-btn px-3 py-2"
          type="button"
          @clickButton="addDirection"
          >Add More</base-button
        >
        <!-- Add More Button End -->
      </div>
      <!-- Direction End -->

      <!-- Form Button Start -->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <!-- Cancel Button Start -->
        <!-- 12 -->
        <base-button class="cancel-btn px-3 py-2 ms-1">Cancel</base-button>
        <!-- Cancel Button End -->

        <!-- Submit Button Start -->
        <!-- 13 -->
        <base-button
          class="submit-recipe-btn px-3 py-2 ms-1"
          type="button"
          @clickButton="addNewRecipe"
          >Submit</base-button
        >
        <!-- Submit Button End -->
      </div>
      <!-- Form Button End -->
    </form>
  </li>
</template>
<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseTextArea from "../ui/BaseTextArea.vue";
import BaseSelect from "../ui/BaseSelect.vue";
// M37
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//M38
import { onMounted } from "vue";
import { defineProps } from "vue";

const router = useRouter();

const recipeData = reactive({
  imageLink: "",
  name: "",
  description: "",
  category: "",
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
});

const store = useStore();
// M37
const props = defineProps({
  isEdit: { type: Boolean, required: true },
});

onMounted(() => {
  console.log(props.isEdit);
  if (props.isEdit) {
    Object.assign(recipeData, store.state.recipe.recipeDetail);
    ingredientCount.value = recipeData.ingredients.length;
    directionCount.value = recipeData.directions.length;
    console.log(recipeData.name);
  }
});

const ingredientCount = ref(1);
const directionCount = ref(1);
const addIngredient = () => {
  ingredientCount.value++;
};

const addDirection = () => {
  directionCount.value++;
};

const deleteIngredient = (index) => {
  recipeData.ingredients.splice(index, 1);
  ingredientCount.value--;
};

const deleteDirection = (index) => {
  recipeData.directions.splice(index, 1);
  directionCount.value--;
};

const totalTime = () => {
  recipeData.totalTime =
    parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime);
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    recipeData.imageLink = reader.result;
  });
};

const addNewRecipe = async () => {
  console.log(router.currentRoute.value.params.id);
  if (props.isEdit) {
    await store.dispatch("recipe/updateRecipe", {
      id: router.currentRoute.value.params.id,
      newRecipe: recipeData,
    });
  } else {
    await store.dispatch("recipe/addNewRecipe", recipeData);
  }
  router.push("/user/user-recipe");
  return;
};

const changeRecipeType = (event) => {
  console.log(event.target.value);
  recipeData.category = event.target.value;
};

</script>

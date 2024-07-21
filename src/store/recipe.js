import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      //M33
      recipeDetail: {},
    };
  },
  getters: {},
  mutations: {
    setRecipeData(state, payload) {
      state.recipes = payload;
    },
    //M33
    setRecipeDetail(state, payload) {
      state.recipeDetail = payload;
    },
    //M37
    setNewRecipe(state, payload) {
      state.recipes.push.payload;
    },
  },
  actions: {
    async getRecipeData({ commit }) {
      try {
        // tda : https://recipe-vue-batch2-defaut-rtdb.firebaseio.com/recipes.json
        // ms irma : https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes.json
        //mr wen : https://vue-js-project-5e9a5-default-rtdb.firebaseio.com/recipes.json
        const { data } = await axios.get(
          "https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes.json"
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        commit("setRecipeData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    //M33
    async getRecipeDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes/${payload}.json`
        );
        commit("setRecipeDetail", data);
      } catch (err) {
        console.log(err);
      }
    },
    // M37
    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };

      try {
        const { data } = await axios.post(
          `https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
          newData
        );

        commit("setNewRecipe", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteRecipe({ dispatch, rootState }, payload) {
      try {
        const { data } = await axios.delete(
          `https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`
        );
        await dispatch("getRecipeData");
      } catch (err) {
        console.log(err);
      }
    },
    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      try {
        const { data } = await axios.put(
          `https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
          newRecipe
        );
        await dispatch("getRecipeData");
      } catch (error) {
        console.log(error);
      }
    },
  },
};

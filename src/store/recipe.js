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
    setRecipeDetail (state, payload) {
    state.recipeDetail = payload
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
    async getRecipeDetail ({commit}, payload) {
        try {
            const { data } = await axios.get(`https://recipe-vue-5fb49-default-rtdb.firebaseio.com/recipes/${payload}.json`)
            commit("setRecipeDetail" , data)
        } catch (err) {
            console.log(err);
        }
    },
  },
};

import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import Cookies from "js-cookie";
import { store } from "./store/index";
// M36
const checkAuth = () => {
  const jwtCookie = Cookies.get("jwt");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");

  if (jwtCookie) {
    if (new Date().getTime() < +expirationDate) {
      store.commit("auth/setToken", {
        idToken: jwtCookie,
        expiresIn: expirationDate,
      });
      store.dispatch("auth/getUser", userId);
      return true;
    } else {
      store.commit("auth/setUserLogout");
      return false;
    }
  } else {
    return false;
  }
};

export const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    //M36
    beforeEnter: () => {
      checkAuth();
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  //M33
  {
    path: "/recipe/:id",
    name: "detailPage",
    component: DetailPage,
  },
  // M35
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    // M36
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  //M36
  {
    path: "/new-recipe",
    name: "newRecipePage",
    component: NewRecipePage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
];

import { reactive } from "vue";
import loginService from "../services/login";
import registerService from "../services/register";
import { router } from "../router";
export const state = reactive({
  username: "",
  password: "",
  repeatPassword: "",
  error: "",
  mode: "register"
});

const resetForm = () => {
  state.username = "";
  state.password = "";
  state.repeatPassword = "";
};
export const onLogin = async () => {
  const { username, password } = state;
  if (!username) {
    state.error = "username is required";
    return;
  }

  if (!password) {
    state.error = "password is required";
    return;
  }
  const result = await loginService(state.username, state.password);
  if (result.statusCode) {
    state.error = result.message.join(" , ");
    return;
  }
  localStorage.setItem("token", result.token);
  router.push({ name: "home" });
};

export const onRegister = async () => {
  const { username, password } = state;

  if (!username) {
    state.error = "username is required";
    return;
  }

  if (!password) {
    state.error = "password is required";
    return;
  }
  const result = await registerService(state.username, state.password);
  console.log(result);
  if (result.statusCode) {
    state.error = result.message.join(" , ");
    return;
  }
  resetForm();
  state.mode = "login";
};

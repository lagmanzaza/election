<template>
  <div
    class="w-full max-w-xs my-8 rounded bg-white pt-6"
    style="margin-top: 10vh; margin-left: auto; margin-right: auto;"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-xs font-bold mb-2" for="username">
        Username
      </label>
      <input
        v-model="state.username"
        class="text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-xs font-bold mb-2" for="username">
        Password
      </label>
      <input
        v-model="state.password"
        class=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="text"
        placeholder="Password"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-xs font-bold mb-2" for="username">
        Repeat Password
      </label>
      <input
        v-model="state.repeatPassword"
        class="text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="repeat-password"
        type="text"
        placeholder="Repeat Password"
      />
    </div>
    <button
      @click="onRegister"
      style="display: block; margin-left: auto; margin-right: auto;"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
    >
      Register
    </button>
  </div>
</template>

<script lang="ts">
import state from "../features/register-state";
export default {
  setup(props, context) {
    const onRegister = async () => {
      const { username, password, repeatPassword } = state;
      console.log(username);
    };
    return {
      state,
      onRegister
    };
  }
};
</script>
<style scoped></style>

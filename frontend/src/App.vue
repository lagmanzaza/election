<template>
  <RegisterComponent v-on:onRegister="onRegister" />
</template>

<script lang="ts">
import RegisterComponent from "./components/Register-form.vue";
export default {
  components: {
    RegisterComponent
  },
  setup() {
    const onRegister = () => {
      console.log("sss");
    };
    return {
      onRegister
    };
  }
};
</script>

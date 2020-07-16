<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg rounded-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ partyName }}</div>
      <div class="font-bold text-sm mb-2">{{ score }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partyName: String,
    score: Number
  }
};
</script>

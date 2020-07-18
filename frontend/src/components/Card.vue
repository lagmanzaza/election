<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg rounded-lg">
    <div class="px-6 py-4 text-center">
      <div class="font-bold text-xl mb-2">{{ partyName }}</div>
      <div class="font-bold text-sm mb-2">{{ score }}</div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="onVote"
      >
        Vote
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partyName: String,
    score: Number,
    partyId: Number
  },
  setup(props, context) {
    const onVote = () => {
      context.emit("on-vote", props.partyId);
    };
    return {
      onVote
    };
  }
};
</script>

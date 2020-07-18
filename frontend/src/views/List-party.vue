<template>
  <div class="container">
    <!-- {{ state.parties[0] }} -->
    <CardComponent
      v-for="(value, index) in state.parties"
      :partyId="value.partyId"
      :score="value.score"
      :partyName="value.name"
      v-on:on-vote="onVote"
    />
  </div>
</template>
<script lang="ts">
import { onUnmounted, watchEffect } from "vue";
import { listParty, vote } from "../services/party";
import CardComponent from "../components/Card.vue";
import { state } from "../features/parties-state";
import webSocket from "../services/websocket";
import { WS_URL } from "../config";
import {
  buildMessage,
  parseMessage
} from "../utils/transform-websocket-message";

export default {
  components: {
    CardComponent
  },
  setup() {
    const socket = new WebSocket(
      `ws://${WS_URL}/socket.io/?EIO=3&transport=websocket`
    );

    onUnmounted(() => {
      socket.close();
    });

    socket.addEventListener("message", function(event) {
      console.log(parseMessage(event.data));
      const response = parseMessage(event.data);
      if (response.event === "votes") {
        const partyId = response.data.partyId;
        const partyIndex = state.parties.findIndex(
          (val, index) => val.partyId === partyId
        );

        state.parties[partyIndex].score += 1;
      }
    });

    watchEffect(() => {
      listParty().then(data => {
        state.parties = data;
      });
    });

    const onVote = async partyId => {
      const data = await vote({ partyId });
    };

    return {
      state,
      onVote
    };
  }
};
</script>

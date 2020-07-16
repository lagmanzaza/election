<template>
  <div class="container">
    <CardComponent />
  </div>
</template>
<script lang="ts">
import { onUnmounted } from "vue";
import { listParty } from "../services/party";
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
    socket.onopen = function(event) {
      console.log("websocket connect");
    };

    onUnmounted(() => {
      socket.close();
      console.log("unmounted");
    });

    socket.addEventListener("message", function(event) {
      console.log(parseMessage(event.data));
    });
    listParty().then(data => {
      state.parties = data;
    });

    return {
      state
    };
  }
};
</script>

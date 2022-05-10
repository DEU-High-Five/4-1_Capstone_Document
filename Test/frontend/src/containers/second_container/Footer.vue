<template>
  <RingBottomNavigation
    class="pb-1"
    border-color="#a90b0b"
    title-color="#a90b0b"
    badge-color="#a90b0b"
    icon-color="#a90b0b"
    :options="options"
    v-model="selected"
  >
    <template #icon="{ props }"> <CIcon :content="props.icon" /> </template>
  </RingBottomNavigation>
</template>

<script>
import {
  cilCommentSquare,
  cilEnvelopeClosed,
  cilHome,
  cilSettings,
  cilTask,
  cilUser,
  cilQrCode,
  cilGraph,
  cilPeople
} from "@coreui/icons";
import { RingBottomNavigation } from "bottom-navigation-vue";
export default {
  name: "TheFooter",
  components: { RingBottomNavigation },
  home: cilHome,
  settings: cilSettings,
  comment: cilCommentSquare,
  envelope: cilEnvelopeClosed,
  task: cilTask,
  user: cilUser,

  props: [],
  data() {
    return {
      selected: 1,
      options: [
        { id: 1, icon: cilHome, title: "관리 홈" },
        { id: 2, icon: cilPeople, title: "회원 명단" },
        { id: 3, icon: cilQrCode, title: "QR 코드 촬영" },
        { id: 4, icon: cilGraph, title: "AI 조언" },
      ],
    };
  },
};
</script>

<template>
  <RingBottomNavigation
    v-if="isManager()"
    class="pb-1"
    border-color="#a90b0b"
    title-color="#a90b0b"
    badge-color="#a90b0b"
    icon-color="#a90b0b"
    :options="options_manager"
    v-model="selected"
    :replace-route="true"
  >
    <template #icon="{ props }"> <CIcon :content="props.icon" /> </template>
  </RingBottomNavigation>
  <RingBottomNavigation
    v-else
    class="pb-1"
    border-color="#a90b0b"
    title-color="#a90b0b"
    badge-color="#a90b0b"
    icon-color="#a90b0b"
    :options="options_aff"
    v-model="selected"
    :replace-route="true"
  >
    <template #icon="{ props }"> <CIcon :content="props.icon" /> </template>
  </RingBottomNavigation>
</template>

<script>
import {
  cilHome,
  cilQrCode,
  cilGraph,
  cilPeople,
} from "@coreui/icons";
import { RingBottomNavigation } from "bottom-navigation-vue";
export default {
  name: "TheFooter",
  components: { RingBottomNavigation },
  home: cilHome,

  props: [],
  data() {
    return {
      selected: 1,
      options_manager: [
        { id: 1, icon: cilHome, title: "관리 홈", path: { name: "ViewList" } },
        {
          id: 2,
          icon: cilPeople,
          title: "회원 명단",
          path: { name: "GroupMemberList" },
        },
        { id: 3, icon: cilQrCode, title: "QR 코드 촬영" },
        { id: 4, icon: cilGraph, title: "AI 조언" },
      ],
      options_aff: [
        { id: 1, icon: cilHome, title: "관리 홈", path: { name: "ViewList" } },
        { id: 2, icon: cilQrCode, title: "QR 코드 촬영" },
      ],
    };
  },
  methods: {
    isManager() {
      switch (this.$store.state.pageStore.isManager) {
        case "manage":
          return true;
        case "affiliation":
          return false;
        default:
          return false;
      }
    },
  },
};
</script>

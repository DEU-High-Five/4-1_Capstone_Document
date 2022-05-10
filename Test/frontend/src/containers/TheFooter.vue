<template>
<div>
  <SwipeBottomNavigation 
    class="pb-3"
    swiper-color='#a90b0b'
    background-color='#FFFFFF'
    icon-color='#a90b0b'
    style="height:70px"
    :options="options"
    v-model="selected"
  >
    <template #icon="{ props }"> <CIcon :content="props.icon" size="lg" /> </template>
  </SwipeBottomNavigation>
  </div>
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
import { SwipeBottomNavigation  } from "bottom-navigation-vue";
export default {
  name: "TheFooter",
  components: { SwipeBottomNavigation  },

  props: [],
  data() {
    return {
      selected: 2,
      options: [
        { id: 1, icon: cilPeople, title: "회원 명단" },
        { id: 2, icon: cilHome, title: "메인 홈" },
        { id: 3, icon: cilSettings, title: "설정" },
      ],
    };
  },
};
</script>

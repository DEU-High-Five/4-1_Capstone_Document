<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition :name="transition" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  data(){
    return{
      transition: ""
    }
  },
  watch: { 
    $route(to, from) {
      this.transition = "fade";
    }
    
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  height: 90vh;
  transition: all 0.4s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}



.slide-rev-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-rev-fade-enter-active,
.slide-rev-fade-leave-active {
  height: 90vh;
  transition: all 0.4s ease;
}

.slide-rev-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

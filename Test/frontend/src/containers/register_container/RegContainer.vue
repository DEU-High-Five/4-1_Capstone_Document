<template>
  <div class="c-app">
    <RegSidebar/>
    <CWrapper>
      <RegHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import RegHeader from './RegHeader'
import RegFooter from './RegFooter'

export default {
  name: 'RegContainer',
  components: {
    RegHeader,
    RegFooter
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<template> 
<div id="app"> 
    <main> 
      <transition :name="transitionName" mode="out-in"> <!-- :name="transitionName" --> 
        <router-view/> 
      </transition> 
    </main> 
</div> 
</template>


<script>
export default {
  name: 'App',
  data() { 
    return { 
      transitionName: "" 
    };
  },
  watch: { 
    $route(to, from) {
      if(to.meta.text == "view_list")
        this.transitionName = "fade";
      else if(to.meta.page == null || from.meta.page == null){ 
        this.transitionName = "fade"; 
      }else{ 
        this.transitionName = to.meta.page > from.meta.page ? "slide-fade" : "slide-rev-fade"; 
      }


      // console.log(to.meta.page_ != undefined && from.meta.page_ != undefined)
      // if (to.meta.page_ != undefined && from.meta.page_ != undefined){
      //   this.transitionName = to.meta.page_ > from.meta.page_ ? "slide-fade" : "slide-rev-fade"; 
      // }
      // console.log(this.transitionName)


      // if((from.meta.text === "matching_home") && (to.meta.text === "in_category")){
      //   this.transitionName = "next"; 
      // }
      // else if((to.meta.text === "matching_home") && (from.meta.text === "in_category")){
      //   this.transitionName = "prev"; 
      // }
      // else this.transitionName = "slide-fade"
      // console.log(from.meta.text + " " +to.meta.text + " " + (to.meta.text === "matching_home")); 
    }
    
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>

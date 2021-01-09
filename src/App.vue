<template>
  <div id="app">

    <nav class="container section">
      <router-view name="search"></router-view>
    </nav>

    <section class="container section">
      <router-view></router-view>
    </section>
    
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

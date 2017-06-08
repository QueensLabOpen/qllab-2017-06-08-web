<template>
  <div>
    <div>
      test
      <label for="image">
        <img src="" />
      </label>
      <input id="image" type="file" v-on:change="saveImage" />
    </div>
  </div>
</template>

<script>
  export default {
      methods: {
          saveImage(e) {}
      }
  }
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" scoped></style>

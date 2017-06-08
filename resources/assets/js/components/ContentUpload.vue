<template>
  <div>
    <div>
      <label for="image">
        <img :src="imageWithIdentifier" v-if="$store.state.image" />
      </label>
      <input id="image" type="file" v-on:change="saveImage" />
    </div>
  </div>
</template>

<script>
  export default {
      methods: {
          saveImage(e) {
              const that = this

              // Start reader buffer
              const reader = new window.FileReader()
              // Add listener to buffer
              reader.addEventListener('load', () => {
                  that.$store.commit('SET_IMAGE', reader.result.substr(reader.result.indexOf(',') + 1))
              }, false)

              // Get data from file
              reader.readAsDataURL(e.target.files[0])
          }
      },
      computed: {
          imageWithIdentifier() {
              return 'data:image/png;base64, ' + this.$store.state.image
          }
      }
  }
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" scoped></style>

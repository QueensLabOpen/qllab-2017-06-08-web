<template>
  <div>
    <label for="image">
      <img :src="imageWithIdentifier" v-if="$store.state.image" />
    </label>
    <input id="image" type="file" v-on:change="saveImage" />
    <div>
      <div v-on:click="$store.dispatch('POST_IMAGE')">Send Image</div>
    </div>
  </div>
</template>

<script>
  export default {
      methods: {
          saveImage(e) {
              const that = this;

              // Start reader buffer
              const reader = new window.FileReader();
              // Add listener to buffer
              reader.addEventListener('load', () => {
                  that.$store.commit('SET_IMAGE', reader.result.substr(reader.result.indexOf(',') + 1));
              }, false)
e
              // Get data from file
              reader.readAsDataURL(e.target.files[0]);

              that.$store.commit('SET_FILENAME', e.target.files[0].name);
          }
      },
      computed: {
          imageWithIdentifier() {
              return 'data:image/png;base64, ' + this.$store.state.image;
          }
      }
  }
</script>

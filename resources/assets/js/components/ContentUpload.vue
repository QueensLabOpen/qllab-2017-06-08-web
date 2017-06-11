<template>
  <div class="wrap">
    <section>
      <label for="image">
        <img :src="imageWithIdentifier" v-if="$store.state.image" />
        <img src="../../svg/image.svg" v-else />
      </label>
      <input id="image" type="file" v-on:change="saveImage" />
    </section>
    <section>
      <div class="container">
        <v-input label="tags" class="input" v-model="tags"></v-input>
      </div>
    </section>
    <section>
      <form class="container" v-on:submit.prevent="sendRequest">
        <v-button type="success" native-type="submit" :disabled="disabled">Send image</v-button>
      </form>
    </section>
  </div>
</template>

<script>
  import VInput from '../components/Input';
  import VButton from '../components/Button';

  export default {
      data() {
          return {
              tags: ''
          }
      },
      methods: {
          saveImage(e) {
              const that = this;
              // Start reader buffer
              const reader = new window.FileReader();
              // Add listener to buffer
              reader.addEventListener('load', () => {
                  that.$store.commit('SET_IMAGE', reader.result.substr(reader.result.indexOf(',') + 1));
              }, false)

              // Get data from file
              reader.readAsDataURL(e.target.files[0]);

              that.$store.commit('SET_FILENAME', e.target.files[0].name);
          },
          sendRequest() {
              const tags = this.tags.split(',')

              tags.forEach((x) => {
                  if (!this.$store.state.tags.includes(x)) {
                      this.$store.commit('ADD_TAG', x.trim())
                  }
              })
              this.$store.dispatch('POST_IMAGE')
                  .then((response) => {
                      this.$store.commit('CLEAN')
                      this.tags = ''
                      alert('Success!')
                  })
                  .catch((error) => {
                    console.log(error.data.message)
                    alert(error.data.message)
                  })
          }
      },
      computed: {
          imageWithIdentifier() {
              return 'data:image/png;base64, ' + this.$store.state.image;
          },
          disabled() {
              return !(this.tags !== '' && this.$store.state.image);
          }
      },
      components: {
          VInput,
          VButton
      }
  }
</script>

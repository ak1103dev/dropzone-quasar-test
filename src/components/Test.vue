<template>
  <q-layout>
    <div id="test" class="layout-view">
      <p>Welcome to your Vue.js app!</p>
      <button class="primary" @click="checkSignin">check sign in</button>
      <button class="primary" @click="signOut">sign out</button>
      <dropzone
        id="myVueDropzone"
        url="https://httpbin.org/post"
        v-on:vdropzone-success="showSuccess"
      >
        <input type="hidden" name="token" value="xxx">
      </dropzone>
      <!-- <dropzone
        id="uploadImage"
        url="https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
        :thumbnailHeight="200"
        :thumbnailWidth="200"
      ></dropzone> -->
      <p>xxxx</p>
    </div>
  </q-layout>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import {
  handleClientLoad,
  handleAuthClick,
  handleSignoutClick
} from 'src/services/gapi'

export default {
  components: {
    Dropzone
  },
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    handleClientLoad()
  },
  methods: {
    showSuccess (file) {
      console.log('A file was successfully uploaded')
      console.log('file', file)
    },
    checkSignin () {
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
      console.log('is sign in', isSignedIn)
      if (!isSignedIn) {
        handleAuthClick()
      }
    },
    signOut () {
      handleSignoutClick()
    }
  }
}
</script>

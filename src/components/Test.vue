<template>
  <q-layout>
    <div id="test" class="layout-view">
      <p>Welcome to your Vue.js app!</p>
      <button class="primary" @click="checkSignin">check sign in</button>
      <button class="primary" @click="signOut">sign out</button>
      <dropzone
        id="uploadImage"
        url="https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
        acceptedFileTypes="image/*"
        :autoProcessQueue="false"
        @vdropzone-file-added="addFile"
      >
        <!-- <input type="hidden" name="name" value="hello"> -->
      </dropzone>
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
    addFile (file) {
      console.log('add file', file)
      const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media'
      this.$http.post(url, file, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('googleToken')}`,
          'Content-Type': file.type
        }
      }).then(res => {
        console.log(res, res.body)
      }, res => {
        console.error(res)
      })
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

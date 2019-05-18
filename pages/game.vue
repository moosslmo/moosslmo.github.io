<template>
  <div class="container">
    <a-button type="primary"
              @click="cameraOn">Camera on</a-button>
    <div class="camera">
      <video ref="video"
             autoplay
             playsinline
             width="480"
             height="360"></video>
      <canvas class="face"
              ref="userFace"
              width="200"
              height="200"></canvas>
    </div>
    <img class="other__face"
         v-for="user in userList"
         :key="user.name"
         :src="user.faceImage"
         width="200"
         height="200" />
  </div>
</template>

<script>
import db, { firebase } from '../plugins/db'
import User from '../components/User.vue'
import * as faceapi from 'face-api.js'
import { clearInterval } from 'timers';

let faceDetector

export default {
  data: () => ({
    user: null,
    uid: null,
    me: null,
    inputText: '',
    isInputFocus: false,
    isFace: false,
    timer: null,
  }),
  firebase: () => ({
    users: db.ref('users'),
  }),
  async created() {
    if (faceDetector) {
      this.$message.warn(
        `Go to "chrome://flags/" and enable "Experimental Web Platform features" for face detection API.`,
        10,
      )
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.user = user
        this.uid = user.uid
        this.me = {
          ...this.me,
          avatar: user.photoURL,
          name: user.displayName || user.email.substring(0, user.email.lastIndexOf('@')),
          x: 100,
          y: 100,
        }
        db.ref(`users/${this.uid}`).set(this.me)
      }
    })
    const { key } = await db.ref(`users`).push({
      name: Math.random().toString(),
      score: 0,
    })
    this.key = key
    window.addEventListener('beforeunload', e => {
      clearInterval(this.timer)
      db.ref(`users/${key}`).set({})
    })
    window.addEventListener('keypress', e => {
      if (e.keyCode !== 13 || !this.me) return
      if (!this.isInputFocus) {
        this.inputText = ''
        this.$refs.input.focus()
        this.isInputFocus = true
      } else {
        this.isInputFocus = false
        e.target.blur()
        if (this.inputText === '') return
        this.me = {
          ...this.me,
          message: this.inputText,
        }
        db.ref(`users/${this.uid}/message`).set(this.inputText)
        db.ref(`messages`)
          .push()
          .set(this.inputText)
        this.inputText = ''
      }
    })
    window.addEventListener('keypress', async e => {
      // console.log(e.keyCode)
      if ((e.keyCode !== 116 && e.keyCode !== 12613) || this.isInputFocus) return
      if (!this.isFace) {
        this.cameraOn()
        this.isFace = true
        this.timer = setInterval(() => {
          faceDetector.detect(this.$refs.video).then(faces => {
            if (!faces[0]) return
            const { x, y, width, height } = faces[0].boundingBox
            const margin = width / 3
            this.$refs.canvas
              .getContext('2d')
              .drawImage(
                this.$refs.video,
                x - margin,
                y - margin,
                width + margin * 2,
                height + margin * 2,
                0,
                0,
                100,
                100,
              )
            const base = this.$refs.canvas.toDataURL('image/jpeg', 0.5)
            this.me = {
              ...this.me,
              face: base,
              isFace: this.isFace,
            }
            db.ref(`users/${this.uid}`).set(this.me)
          })
        }, 100)
      } else {
        this.isFace = false
        this.me = {
          ...this.me,
          isFace: this.isFace,
        }
        db.ref(`users/${this.uid}`).set(this.me)
        clearInterval(this.timer)
      }
    })
  },
  async mounted() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  },
  methods: {
    mousemove(e) {
      if (!this.user && !this.uid) return
      this.me = {
        ...this.me,
        x: e.pageX,
        y: e.pageY,
      }
      db.ref(`users/${this.uid}`).set(this.me)
    },
    clickOutside(e) {
      this.isInputFocus = false
      e.target.blur()
    },
    async login() {
      const user = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
      // console.log(user)
      this.user = user.user
      this.uid = user.user.uid
      this.me = {
        ...this.me,
        avatar: user.user.photoURL,
        name: user.user.displayName || user.user.email.substring(0, user.user.email.lastIndexOf('@')),
        x: 0,
        y: 0,
      }
      db.ref(`users/${this.uid}`).set(this.me)
    },
    async cameraOn() {
      const video = this.$refs.video
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        const videoTracks = stream.getVideoTracks()
        video.onloadedmetadata = e => video.play()
        video.srcObject = stream
      } catch (e) {
        console.log(e)
      }
      this.timer = setInterval(() => {
        this.detectFace()
      }, 16)
    },
    async detectFace() {
      const detection = await faceapi.detectSingleFace(
        this.$refs.video,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }),
      )
      console.log(detection)
      // const canvas = this.$refs.overlay
      // const dims = faceapi.matchDimensions(canvas, this.$refs.video, true)
      if (detection) {
        //faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, dims))
        this.setUserFace(detection)
      } else {
        console.log('Out of Camera')
      }
    },
    async setUserFace(detection) {
      const detectBox = detection.box
      const userFace = this.$refs.userFace
      const ctx = userFace.getContext('2d')
      const margin = detectBox.width / 5
      let left = detectBox.left - margin
      let top = detectBox.top - margin * 1.5
      let width = detectBox.width + margin * 2
      let height = detectBox.height + margin * 2
      if (width > height) {
        const heightMargin = height - width
        height = width
        top = top + heightMargin / 2
      }
      console.log(width, height)
      ctx.drawImage(this.$refs.video, left, top, width, height, 0, 0, 200, 200)
      db.ref(`users/${this.key}/faceImage`).set(userFace.toDataURL('image/jpeg', 0.3))
    },
  },
  computed: {
    userList() {
      const users = this.users
        .filter(user => user['.key'] !== this.key)
        .map(user => {
          const result = { ...user }
          delete result['.key']
          return result
        })
      return users
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.container {
  /* position: absolute; */
  height: 100%;
  width: 100%;
  cursor: none;
  /* overflow: hidden; */
  .camera {
    /* position: relative; */
    width: 200px;
    canvas {
      /* position: absolute; */
      display: block;
      border-radius: 100%;
    }
    video {
      display: block;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.1);
      visibility: hidden;
    }
  }
  .other__face {
    display: inline-block;
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
}
@keyframes popup {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@keyframes popdown {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
/* video {
  display: none;
}
canvas {
  display: none;
} */
</style>

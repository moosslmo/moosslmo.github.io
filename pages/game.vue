<template>
  <div class="container">
    <div class="camera">
      <video ref="video"
             autoplay
             playsinline
             width="480"
             height="360"></video>
      <canvas class="face"
              id="userFace"
              ref="userFace"
              :width="200"
              :height="200"></canvas>
    </div>
    <div class="board">
      <img src="leaderboard.svg" />
      <div class="ranking"
           v-for="(user,i) in userRankList"
           :key="i">
        <div class="rank">{{ i + 1 }}</div>
        <div class="name">{{ user.name }}</div>
        <div class="score">{{ Math.floor(user.score) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import db, { firebase } from '../plugins/db'
import User from '../components/User.vue'
import * as faceapi from 'face-api.js'
import { MAX_W_SIZE, MAX_H_SIZE } from '../plugins/constants.js'

const GAME_OVER_TIME = 15

export default {
  data: () => ({
    uid: null,
    me: null,
    inputText: '',
    isInputFocus: false,
    isFace: false,
    timer: null,
    key: '',
    faceInterval: null,
    scoreInterval: null,
    manager: null,
    startX: 0,
    startY: 0,
    width: 150,
  }),
  firebase: () => ({
    users: db.ref('users'),
  }),
  async mounted() {
    const key = (this.key = this.$route.query.key)
    const s = await db.ref(`users/${key}`).once('value')
    if (!s.val()) {
      this.$router.push(`/`)
      return
    }
    this.$bindAsObject('user', db.ref(`users/${key}`))
    const score = (this.score = 0)
    const highScore = (this.highScore = 0)
    const outCount = (this.outCount = 0)
    window.addEventListener('beforeunload', e => {
      db.ref(`users/${key}`).set({})
      clearInterval(this.faceInterval)
      clearInterval(this.scoreInterval)
    })
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    this.cameraOn()
  },
  unmount() {
    clearInterval(this.faceInterval)
    clearInterval(this.scoreInterval)
    db.ref(`users/${this.key}`).set({})
  },
  methods: {
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
      this.faceInterval = setInterval(() => {
        this.detectFace()
      }, 16)
      this.scoreInterval = setInterval(() => {
        this.score += 0.5
        if (this.score > this.highScore) {
          this.highScore = this.score
          db.ref(`users/${this.key}/highScore`).set(this.highScore)
        }
        db.ref(`users/${this.key}/score`).set(this.score)
      }, 100)
    },
    async detectFace() {
      const detection = await faceapi.detectSingleFace(
        this.$refs.video,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }),
      )
      // console.log(detection)
      // const canvas = this.$refs.overlay
      // const dims = faceapi.matchDimensions(canvas, this.$refs.video, true)
      if (detection) {
        this.outCount = 0
        //faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, dims))
        this.setUserFace(detection)
      } else {
        // console.log('Out of Camera')
        // db.ref(`users/${this.key}`).set({})
        ++this.outCount
        if (this.outCount > GAME_OVER_TIME) {
          if (this.score > 1) {
            this.score -= Math.floor(this.score / 100)
            if (this.users.filter(user => user['.key'] === this.key).length !== 0) {
              db.ref(`users/${this.key}/score`).set(this.score)
            }
          } else {
            // console.log('GAME OVER')
            db.ref(`users/${this.key}/highScore`).set(this.highScore)
            //this.$router.push(`/die?key=${this.key}`)
          }
        }
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
      const imageWidth = this.score < 100 ? Math.floor(150 + this.score) : 250
      this.width = imageWidth
      ctx.drawImage(this.$refs.video, left, top, width, height, 0, 0, 200, 200)
      if (this.users.filter(user => user['.key'] === this.key).length !== 0) {
        db.ref(`users/${this.key}/faceImage`).set(userFace.toDataURL('image/jpeg', 0.01))
        //db.ref(`users/${this.key}/x`).set(this.user.x)
      }
    },
  },
  computed: {
    userList() {
      const users = this.users
        .filter(user => user['.key'] !== this.key)
        .filter(user => user.faceImage)
        .map(user => {
          const result = { ...user }
          delete result['.key']
          return result
        })
      return users
    },
    userRankList() {
      const users = [...this.users].sort((a, b) => b.score - a.score).slice(0, 5)
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
  display: grid;
  background-color: black;
  overflow-x: hidden;
  position: relative;
  background-image: url('/background-2.gif');
  background-size: 70%;

  .camera {
    justify-self: center;
    align-self: center;
    /* position: relative; */
    /* width: 200px; */
    canvas {
      /* position: absolute; */
      display: block;
      border-radius: 100%;
      border: 6px solid #f2c94c;
    }
    video {
      display: block;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.1);
      visibility: hidden;
    }
  }
  .board {
    position: absolute;
    justify-self: center;
    align-self: end;
    margin-bottom: 30px;
    .ranking {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 26px 1fr 86px;
      font-family: 'Open Sans';
      margin-top: 8px;
      height: 20px;
      .rank {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 19px;
        align-items: center;
        text-align: center;
        color: #ffffff;
        background-color: #ffc338;
        border-radius: 6px;
        margin-left: 6px;
      }
      .name {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 19px;
        align-items: center;
        letter-spacing: -0.06em;
        color: #dad9d9;
        margin-left: 6px;
      }
      .score {
        background-color: #f2f2f2;
        border-radius: 6px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 19px;
        align-items: center;
        text-align: center;
        color: #000a15;
        margin-right: 6px;
      }
    }
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

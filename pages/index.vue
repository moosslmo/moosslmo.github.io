<template>
  <div class="container">
    <div class="logo"></div>
    <a-input placeholder="Your name" class="input-name"/>
    <a-button type="primary" class="btn-start">Game Start</a-button>
  </div>
</template>

<script>
import db, { firebase } from '../plugins/db'
import User from '../components/User.vue'

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
  created() {
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
    window.addEventListener('beforeunload', e => {
      db.ref(`users/${this.uid}`).set({})
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
  },
  computed: {
    userList() {
      const users = this.users.map(user => {
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
  overflow: hidden;
  background-color: black;
  background-image: url(../static/stars.svg)
}

.logo {
  width: 185px;
  height: 138px;
  background-image: url(../static/logo.svg);
  background-repeat: no-repeat;
  line-height: 138px;
  position:absolute;
  top:40%;
  left: 53%;
  transform: translate(-50%, -50%);
}

.input-name {
  width: 240px;
  height: 50px;
  background-color:rgba(255, 255, 255, 0);
  border: 1px solid #fff;
  margin:0 auto;
  text-align: center; 
  color: #fff;

  font-size: 18px;
  position: absolute;
  top: 48%; 
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 10px;
  
}

.btn-start {
  width: 200px;
  height: 50px;
  background-color: #EB5757;
  font-size: 18px;
  position:absolute;
  top:56%;
  left:50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;


}



</style>

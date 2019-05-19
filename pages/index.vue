<template>
  <div class="container">
    <div class="logo-parent">
      <div class="logo bounce"></div>
    </div>
    <a-input placeholder="Your name"
             :value="name"
             @change="input"
             @pressEnter="pressEnter"
             class="input-name center" />
    <a-button type="primary"
              class="btn-start center"
              id="startBtn"
              @click="clickStart">Game Start</a-button>
    <footer>SFACE 2019 ⓒ All Right Reserved</footer>
  </div>
</template>

<script>
import db, { firebase } from '../plugins/db'
import User from '../components/User.vue'
import { MAX_W_SIZE, MAX_H_SIZE } from '../plugins/constants.js'

const MARGIN = 500
const W_MIN = MARGIN
const W_MAX = MAX_W_SIZE - MARGIN
const H_MIN = MARGIN
const H_MAX = MAX_H_SIZE - MARGIN

export default {
  data() {
    return {
      name: '',
    }
  },
  firebase: {
    users: {
      source: db.ref('users'),
      asArray: true,
    },
  },
  methods: {
    input({ target: { value } }) {
      this.name = value.replace(/ /g, "");
      const englishFilter = /^[A-Za-z0-9]*$/
      if (this.users.filter(user => user.name === value).length !== 0) {
        
      } else if (this.name.length > 10) {
        this.message = '10자 이하로 만들어주세요!'
        this.name = this.name.slice(0, 10)
        this.status = 'error'
      } else if (this.name.length == 0) {
        
      } else {
        this.message = ''
        this.status = ''
      }
    },
    pressEnter() {
      if (!this.isValid) return
      this.clickStart()
    },
    clickStart() {
      if(this.name.length > 0){
        const user = {
          name: this.name,
          score: 0,
          highScore: 0,
          x: Math.floor(Math.random() * (W_MAX - W_MIN) + W_MIN), // 500 ~ 2500
          y: Math.floor(Math.random() * (H_MAX - H_MIN) + H_MIN),
        }
        const key = db.ref(`users`).push(user).key
        this.$router.push(`/game?key=${key}`)
      }
    },
  },
  computed: {
    isValid() {
      return (
        this.name !== '' &&
        this.users &&
        this.users.filter(user => user.name === this.name).length === 0 &&
        this.name.length <= 10
      )
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
  cursor: auto;
  overflow: hidden;
  background: url('/background-2.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 100% 100%;
}

.logo-parent {
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  width: 185px;
  height: 138px;
  background-image: url(../static/newLogo.svg);
  background-repeat: no-repeat;
  line-height: 138px;
}

.input-name {
  width: 240px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #fff;
  margin: 0 auto;
  text-align: center;
  color: #fff;

  font-size: 18px;
  top: 51%;
  left: 50%;
  margin-top: 10px;
}

.btn-start {
  width: 200px;
  height: 50px;
  background-color: #eb5757;
  border: 0ex;
  font-size: 18px;
  top: 59%;
  left: 50%;
  margin-top: 20px;
}

.btn-start:active {
  background-color: #fff;
  color: #eb5757;
}

.center {
  position: absolute;
  transform: translate(-50%, -50%);
}

footer {
  font-size: 10px;
  color: #f2c94c;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -28px, 0);
    transform: translate3d(0, -28px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}

.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;

  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  animation-delay: 4s;
  animation-iteration-count: infinite;
}
</style>

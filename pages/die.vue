<template>
  <div class="container">
    <div class="wrapper">
      <div class="score-label"></div>
      <div class="score" ref="score">357</div>
      <div class="face"></div>
      <div class="crown"></div>
      <div class="name">OLIN</div>
      <div class="share-box">
        <div class="button facebook-button">
          <span class="facebook-icon"></span>
          <span class="button-label">Share</span>
        </div>
        <div class="button twitter-button">
          <span class="twitter-icon"></span>
          <span class="button-label">Tweet!</span>
        </div>
      </div>
      <div class="restart-button">
        <span class="button-label">Restart</span>
      </div>
    </div>
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
      status: '',
      message: '',
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
      this.name = value
      if (this.users.filter(user => user.name === value).length !== 0) {
        this.message = '중복된 이름이 있습니다!'
        this.status = 'error'
      } else if (this.name.length > 10) {
        this.message = '10자 이하로 만들어주세요!'
        this.name = this.name.slice(0, 10)
        this.status = 'error'
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
      const user = {
        name: this.name,
        score: 0,
        x: Math.floor(Math.random() * (W_MAX - W_MIN) + W_MIN), // 500 ~ 2500
        y: Math.floor(Math.random() * (H_MAX - H_MIN) + H_MIN),
      }
      const key = db.ref(`users`).push(user).key
      this.$router.push(`/game?key=${key}`)
    },
  },
  computed: {
    isValid() {
      return (
        this.name !== '' &&
        this.users &&
        this.users.filter(user => user.name === this.name).length === 0 &&
        this.name.length <= 8
      )
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  cursor: auto;
  overflow: hidden;
  background: url("/background.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 100% 100%;
}

.wrapper {
  display: inline-block;
  align-self: flex-end;
  margin-bottom: 80px;
}

.score-label {
  width: 63px;
  height: 32px;
  margin: 0 auto;
  background-image: url(../static/score.svg);
  background-repeat: no-repeat;
  line-height: 46px;
  text-align: center;
  color: #F2F2F2;
}

.score {
  height: 100px;
  font-family: Lobster;
  font-style: normal;
  font-weight: normal;
  font-size: 80px;
  line-height: 100px;
  text-align: center;
  color: #F2C94C;
}

.face {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  background: #EB5757;
  border: 10px solid #F2C94C;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
}

.crown {
  position: absolute;
  left: 15.6%;
  right: 68.4%;
  top: 39.44%;
  bottom: 54.28%;
  transform: rotate(-45deg);
}

.name {
  height: 69px;
  font-family: Bahiana;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 69px;
  text-align: center;
  color: #F2F2F2;
}

.share-box {
  margin: 13px 0;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border-radius: 6px;
}

.facebook-button {
  background: #2F80ED;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.facebook-icon {
  width: 17px;
  height: 35px;
  background: url(../static/facebook.svg) no-repeat center;
}

.twitter-button {
  background: #56CCF2;
  margin-left: 5px;
}

.twitter-icon {
  width: 38px;
  height: 30px;
  background: url(../static/twitter.svg) no-repeat center;
}

.restart-button {
  display: inline-block;
  width: 310px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  text-align: center;
  background: #EB5757;
  border-radius: 6px;
}

.button-label {
  width: 62px;
  height: 24px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  color: #FFFFFF;
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
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
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

  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  animation-delay: 10s;
}
</style>

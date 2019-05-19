<template>
  <div class="container">
    <div class="logo-top"></div>
    <div class="user"
         v-for="user in userList"
         :key="user['.key']"
         :style="computePoint(user)">
      <img class="user__face"
           :src="user.faceImage"
           :style="{
						 borderWidth: `${user.score/40 < 1 ? 1 : user.score/40}px`
					 }" />
      <div class="user__border"></div>
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

export default {
  data: () => ({
    user: null,
    uid: null,
    me: null,
    inputText: '',
    isInputFocus: false,
    isFace: false,
    timer: null,
    faceInterval: null,
  }),
  firebase: () => ({
    users: db.ref('users'),
  }),
  methods: {
    computePoint({ x, y, score }) {
      const top = `${(innerHeight / MAX_H_SIZE) * y}px`
      const left = `${(innerWidth / MAX_W_SIZE) * x}px`
      const width = `${50 + score}px`
      return {
        width,
        height: width,
        left,
        top,
      }
    },
  },
  computed: {
    userList() {
      const users = this.users.filter(user => user.faceImage)
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
  background-color: black;
  background-image: url('/background.gif');
  background-size: 5%;
  /* display: grid; */
	display: grid;
  .user {
    position: absolute;
    display: inline-block;
    &__face {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border-color: #f2c94c;
      border-style: solid;
    }
    &__border {
    }
  }
	.board {
    /* position: absolute; */
    justify-self: end;
    align-self: start;
		margin-right: 20px;
		margin-top: 20px;
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

.logo-top {
  width: 67.5px;
  height: 30px;
  position: absolute;
  margin-top: 1%;
  margin-left: 1%;
  background-image: url(../static/newLogo-min.svg);
}
</style>

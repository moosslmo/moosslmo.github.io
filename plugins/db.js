import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import VueFire from 'vuefire'

Vue.use(VueFire)

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDFsfswXtrJo_vtisf1CL5C128W9gwqu78',
  databaseURL: 'https://momo-5f95b.firebaseio.com/',
})

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     isLogin = true
//   }
// })


export { firebase }
export default firebaseApp.database()

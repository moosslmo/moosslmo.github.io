(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{695:function(t,e,n){var content=n(701);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(105).default)("72541fd0",content,!0,{sourceMap:!1})},700:function(t,e,n){"use strict";var r=n(695);n.n(r).a},701:function(t,e,n){(t.exports=n(104)(!1)).push([t.i,".user[data-v-141c844f]{display:grid}.user__message[data-v-141c844f]{position:absolute;display:inline-block;-webkit-transform-origin:bottom center;transform-origin:bottom center;-webkit-transform:translateX(-50%) translateY(calc(-100% - 58px));transform:translateX(-50%) translateY(calc(-100% - 58px));background-color:#ddd;border-radius:8px;padding:4px 8px;max-width:150px}.user__message.new[data-v-141c844f]{-webkit-animation:popup-data-v-141c844f .15s cubic-bezier(.175,.885,.32,1.275);animation:popup-data-v-141c844f .15s cubic-bezier(.175,.885,.32,1.275)}.user__avatar[data-v-141c844f]{position:absolute;cursor:none;border-radius:100%}.user__name[data-v-141c844f]{position:absolute;-webkit-transform:translateX(-50%) translateY(55px);transform:translateX(-50%) translateY(55px)}@-webkit-keyframes popup-data-v-141c844f{0%{-webkit-transform:scale(0) translateX(-50%) translateY(calc(-100% - 58px));transform:scale(0) translateX(-50%) translateY(calc(-100% - 58px))}to{-webkit-transform:scale(1) translateX(-50%) translateY(calc(-100% - 58px));transform:scale(1) translateX(-50%) translateY(calc(-100% - 58px))}}@keyframes popup-data-v-141c844f{0%{-webkit-transform:scale(0) translateX(-50%) translateY(calc(-100% - 58px));transform:scale(0) translateX(-50%) translateY(calc(-100% - 58px))}to{-webkit-transform:scale(1) translateX(-50%) translateY(calc(-100% - 58px));transform:scale(1) translateX(-50%) translateY(calc(-100% - 58px))}}",""])},702:function(t,e,n){"use strict";var r={props:["message","x","y","avatar","name","face","isFace"],data:function(){return{width:100}},watch:{message:function(t){var e=this;this.$refs.message&&this.$refs.message.classList.add("new"),setTimeout(function(){return e.$refs.message.classList.remove("new")},150)}}},o=(n(700),n(70));Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user"},[t.message?n("div",{ref:"message",staticClass:"user__message",style:{left:t.x+"px",top:t.y+"px"}},[t._v("\n    "+t._s(t.message)+"\n  ")]):t._e(),t._v(" "),n("img",{staticClass:"user__avatar",style:{left:t.x-t.width/2+"px",top:t.y-t.width/2+"px"},attrs:{src:t.isFace?t.face:t.avatar,width:t.width}}),t._v(" "),n("div",{staticClass:"user__name",style:{left:t.x+"px",top:t.y+"px"}},[t._v("\n    "+t._s(t.name)+"\n  ")])])},[],!1,null,"141c844f",null).exports},705:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return o});var r=5e3,o=2500},714:function(t,e,n){"use strict";t.exports=function(t,e){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)||e?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},734:function(t,e,n){var content=n(867);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(105).default)("ba92664a",content,!0,{sourceMap:!1})},866:function(t,e,n){"use strict";var r=n(734);n.n(r).a},867:function(t,e,n){e=t.exports=n(104)(!1);var r=n(714),o=r(n(868)),c=r(n(869)),l=r(n(870));e.push([t.i,".container[data-v-51fe8b16]{display:flex;height:100%;width:100%;justify-content:center;cursor:auto;overflow:hidden;background:url(/background.gif);background-repeat:no-repeat;background-size:cover;background-size:100% 100%}.wrapper[data-v-51fe8b16]{display:inline-block;align-self:flex-end;margin-bottom:80px}.score-label[data-v-51fe8b16]{width:63px;height:32px;margin:0 auto;background-image:url("+o+");background-repeat:no-repeat;line-height:46px;text-align:center;color:#f2f2f2}.score[data-v-51fe8b16]{height:100px;font-family:Lobster;font-style:normal;font-weight:400;font-size:80px;line-height:100px;text-align:center;color:#f2c94c}.face[data-v-51fe8b16]{width:250px;height:250px;margin:0 auto;background:#eb5757;border:10px solid #f2c94c;box-sizing:border-box;box-shadow:0 4px 4px rgba(0,0,0,.25);border-radius:100%}.crown[data-v-51fe8b16]{position:absolute;left:15.6%;right:68.4%;top:39.44%;bottom:54.28%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.name[data-v-51fe8b16]{height:69px;font-family:Bahiana;font-style:normal;font-weight:400;font-size:60px;line-height:69px;text-align:center;color:#f2f2f2}.share-box[data-v-51fe8b16]{margin:13px 0}.button[data-v-51fe8b16]{display:inline-flex;align-items:center;justify-content:center;width:150px;height:50px;border-radius:6px}.facebook-button[data-v-51fe8b16]{background:#2f80ed;box-shadow:0 4px 4px rgba(0,0,0,.25)}.facebook-icon[data-v-51fe8b16]{width:17px;height:35px;background:url("+c+") no-repeat 50%}.twitter-button[data-v-51fe8b16]{background:#56ccf2;margin-left:5px}.twitter-icon[data-v-51fe8b16]{width:38px;height:30px;background:url("+l+") no-repeat 50%}.restart-button[data-v-51fe8b16]{display:inline-block;width:310px;height:50px;margin:0 auto;line-height:50px;text-align:center;background:#eb5757;border-radius:6px}.button-label[data-v-51fe8b16]{width:62px;height:24px;font-family:Open Sans;font-style:normal;font-weight:700;font-size:18px;text-align:center;color:#fff}@-webkit-keyframes bounce-data-v-51fe8b16{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}@keyframes bounce-data-v-51fe8b16{0%,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1);-webkit-transform:translateZ(0);transform:translateZ(0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}.bounce[data-v-51fe8b16]{-webkit-animation-name:bounce-data-v-51fe8b16;animation-name:bounce-data-v-51fe8b16;-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:10s;animation-delay:10s}",""])},868:function(t,e,n){t.exports=n.p+"img/f2ce070.svg"},869:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxNyAzNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDBDMTIuMSAwIDE0LjIgMCAxNi4zIDBDMTYuMyAyIDE2LjMgNCAxNi4zIDZDMTUgNiAxMy44IDYgMTIuNiA2QzExLjQgNiAxMC45IDYuNSAxMC44IDcuN0MxMC44IDguOCAxMC44IDkuOCAxMC44IDEwLjlDMTAuOCAxMSAxMC44IDExLjEgMTAuOCAxMS4zQzEyLjYgMTEuMyAxNC41IDExLjMgMTYuMyAxMS4zQzE2LjEgMTMuNCAxNS45IDE1LjQgMTUuNyAxNy41QzE0IDE3LjUgMTIuNCAxNy41IDEwLjggMTcuNUMxMC44IDIzLjMgMTAuOCAyOS4yIDEwLjggMzVDOC40IDM1IDYgMzUgMy41IDM1QzMuNSAzNC44IDMuNSAzNC42IDMuNSAzNC40QzMuNSAyOS4xIDMuNSAyMy44IDMuNSAxOC41QzMuNSAxNy41IDMuNSAxNy41IDIuNSAxNy41QzEuNyAxNy41IDAuOSAxNy41IDAgMTcuNUMwIDE1LjQgMCAxMy40IDAgMTEuM0MxLjIgMTEuMyAyLjMgMTEuMyAzLjQgMTEuM0MzLjQgMTAuMSAzLjQgOC45IDMuNCA3LjdDMy40IDYuOSAzLjUgNi4yIDMuNiA1LjRDNC4zIDIuOCA1LjkgMSA4LjUgMC4zQzkgMC4yIDkuNSAwLjEgMTAgMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="},870:function(t,e,n){t.exports=n.p+"img/cc13a61.svg"},881:function(t,e,n){"use strict";n.r(e);n(148);var r=n(147),o=(n(702),n(705)),c=o.b-500,l=o.a-500,f={data:function(){return{name:"",status:"",message:""}},firebase:{users:{source:r.a.ref("users"),asArray:!0}},methods:{input:function(t){var e=t.target.value;this.name=e,0!==this.users.filter(function(t){return t.name===e}).length?(this.message="중복된 이름이 있습니다!",this.status="error"):this.name.length>10?(this.message="10자 이하로 만들어주세요!",this.name=this.name.slice(0,10),this.status="error"):(this.message="",this.status="")},pressEnter:function(){this.isValid&&this.clickStart()},clickStart:function(){var t={name:this.name,score:0,x:Math.floor(Math.random()*(c-500)+500),y:Math.floor(Math.random()*(l-500)+500)},e=r.a.ref("users").push(t).key;this.$router.push("/game?key=".concat(e))}},computed:{isValid:function(){var t=this;return""!==this.name&&this.users&&0===this.users.filter(function(e){return e.name===t.name}).length&&this.name.length<=8}},components:{}},d=(n(866),n(70)),component=Object(d.a)(f,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"score-label"}),t._v(" "),n("div",{ref:"score",staticClass:"score"},[t._v("357")]),t._v(" "),n("div",{staticClass:"face"}),t._v(" "),n("div",{staticClass:"crown"}),t._v(" "),n("div",{staticClass:"name"},[t._v("OLIN")]),t._v(" "),t._m(0),t._v(" "),t._m(1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"share-box"},[e("div",{staticClass:"button facebook-button"},[e("span",{staticClass:"facebook-icon"}),this._v(" "),e("span",{staticClass:"button-label"},[this._v("Share")])]),this._v(" "),e("div",{staticClass:"button twitter-button"},[e("span",{staticClass:"twitter-icon"}),this._v(" "),e("span",{staticClass:"button-label"},[this._v("Tweet!")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"restart-button"},[e("span",{staticClass:"button-label"},[this._v("Restart")])])}],!1,null,"51fe8b16",null);e.default=component.exports}}]);
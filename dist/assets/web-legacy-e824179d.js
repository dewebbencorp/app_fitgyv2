System.register(["./index-legacy-06a412d1.js"],(function(e,t){"use strict";var n;return{setters:[e=>{n=e.W}],execute:function(){e("AppWeb",class extends n{constructor(){super(),this.handleVisibilityChange=()=>{const e={isActive:!0!==document.hidden};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}async getInfo(){throw this.unimplemented("Not implemented on web.")}async getLaunchUrl(){return{url:""}}async getState(){return{isActive:!0!==document.hidden}}async minimizeApp(){throw this.unimplemented("Not implemented on web.")}})}}}));

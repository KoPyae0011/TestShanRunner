window.__require=function e(t,o,i){function n(s,r){if(!o[s]){if(!t[s]){var l=s.split("/");if(l=l[l.length-1],!t[l]){var c="function"==typeof __require&&__require;if(!r&&c)return c(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+s+"'")}s=l}var u=o[s]={exports:{}};t[s][0].call(u.exports,function(e){return n(t[s][1][e]||e)},u,u.exports,e,t,o,i)}return o[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<i.length;s++)n(i[s]);return n}({CameraController:[function(e,t){"use strict";cc._RF.push(t,"bb020k9nRtHBLlYMXLg8zjz","CameraController"),cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},camera:cc.Camera,anim:cc.Animation,jumpZoom:!1,centerAtStart:!1,smoothFollow:!1,followX:{default:0,visible:function(){return this.smoothFollow}},followY:{default:0,visible:function(){return this.smoothFollow}},minFollowDist:{default:0,visible:function(){return this.smoothFollow}},followRatio:{default:0,visible:function(){return this.smoothFollow}},overview:!1,overviewTargets:{default:[],type:[cc.Node],visible:function(){return this.overview}},overviewMargin:{default:0,visible:function(){return this.overview}},speedZoom:!1,zoomInSpeed:{default:0,visible:function(){return this.speedZoom}},zoomOutSpeed:{default:0,visible:function(){return this.speedZoom}},canShake:!1,shakeDuration:{default:0,visible:function(){return this.canShake}},pointerPan:!1,pointerXMult:{default:0,visible:function(){return this.pointerPan}},pointerYMult:{default:0,visible:function(){return this.pointerPan}},useBoundaries:!1,topBound:{default:0,visible:function(){return this.useBoundaries}},bottomBound:{default:0,visible:function(){return this.useBoundaries}},leftBound:{default:0,visible:function(){return this.useBoundaries}},rightBound:{default:0,visible:function(){return this.useBoundaries}}},onLoad:function(){this.startFollow=!1;var e=cc.find("Canvas").getComponent(cc.Canvas);this.visibleSize=cc.view.getVisibleSize(),this.initZoomRatio=this.camera.zoomRatio,this.centerAtStart&&(this.node.position=this.target.convertToWorldSpaceAR(cc.Vec2.ZERO)),this.previousPos=this.node.position,this.pointerPan&&(this.overview=!1,this.speedZoom=!1,e.node.on("mousemove",this.onMouseMove,this),e.node.on("touchmove",this.onTouchMove,this),this.pointerPos=null),this.overview&&(this.jumpZoom=!1,this.speedZoom=!1),this.speedZoom&&(this.jumpZoom=!1)},onEnable:function(){},onDisable:function(){},lateUpdate:function(e){var t;if(t=this.overview?this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint()):this.target.parent.convertToWorldSpaceAR(this.target.position),this.pointerPan&&this.pointerPos){var o=this.pointerPos.x/(this.visibleSize.width/2)-1,i=this.pointerPos.y/(this.visibleSize.height/2)-1;o*=this.pointerXMult,i*=this.pointerYMult,t=cc.pAdd(t,cc.p(o,i))}if(this.smoothFollow?((Math.abs(t.x-this.node.x)>=this.followX||Math.abs(t.y-this.node.y)>=this.followY)&&(this.startFollow=!0),this.startFollow&&(this.node.position=this.node.position.lerp(t,this.followRatio),cc.pDistance(t,this.node.position)<=this.minFollowDist&&(this.startFollow=!1))):this.node.position=this.node.parent.convertToNodeSpaceAR(t),this.speedZoom){var n=Math.abs(this.previousPos.x-t.x)/e,a=0;n>this.zoomOutSpeed?(a=1-(n-this.zoomOutSpeed)/(this.zoomInSpeed-this.zoomOutSpeed),this.camera.zoomRatio=cc.lerp(this.camera.zoomRatio,a,.02)):this.camera.zoomRatio=cc.lerp(this.camera.zoomRatio,this.initZoomRatio,.02)}if(this.previousPos=t,this.jumpZoom){var s=t.y/cc.winSize.height;this.camera.zoomRatio=1+.35*(.6-s)}if(this.useBoundaries){var r=this.visibleSize.width/2/this.camera.zoomRatio,l=this.visibleSize.height/2/this.camera.zoomRatio,c=this.node.x-r,u=this.node.x+r,d=this.node.y-l,h=this.node.y+l;c<this.leftBound&&(this.node.x=this.leftBound+r),d<this.bottomBound&&(this.node.y=this.bottomBound+l),u>this.rightBound&&(this.node.x=this.rightBound-r),h>this.topBound&&(this.node.y=this.topBound-l)}this.node.y=0},getOverviewTargetsMidpoint:function(){for(var e=cc.p(0,0),t=99999,o=99999,i=-99999,n=-99999,a=0;a<this.overviewTargets.length;++a){var s=this.overviewTargets[a];i=s.x>i?s.x:i,t=s.x<t?s.x:t,n=s.y>n?s.y:n,o=s.y<o?s.y:o}i+=this.overviewMargin,t-=this.overviewMargin,n+=this.overviewMargin,o-=this.overviewMargin;var r=Math.abs(i-t),l=Math.abs(n-o);e=cc.p(t+r/2,o+l/2);var c=Math.max(r/this.visibleSize.width,l/this.visibleSize.height);return this.camera.zoomRatio=1/c,e},shakeCamera:function(){this.canShake&&(this.anim.play("shake"),this.scheduleOnce(this.stopShake.bind(this),this.shakeDuration))},stopShake:function(){this.anim.stop(),this.camera.node.position=cc.p(0,0)},onMouseMove:function(e){this.pointerPos=e.getLocation(),console.log(e)},onTouchMove:function(e){this.pointerPos=e.getLocation(),console.log(e)}}),cc._RF.pop()},{}],GameMainController:[function(e,t){"use strict";var o;cc._RF.push(t,"ed7b59IyE1Dy4uQUp2SbvR/","GameMainController"),cc.Class({extends:cc.Component,properties:{bgPrefab:{default:null,type:cc.Prefab},bgLayer:{default:null,type:cc.Node},gameLabel:{default:null,type:cc.Label},winNode:{default:null,type:cc.Node},winAmount:{default:null,type:cc.Label},winText:{default:null,type:cc.Label},level:{default:null,type:cc.Label},gameOverNode:{default:null,type:cc.Node},player:{default:null,type:cc.Node},playerIdle:{default:null,type:cc.Node},playerRender:{default:null,type:cc.Node},gameClient:{default:null,type:cc.Node},actionReady:{default:null,type:cc.Component.EventHandler},actionContinue:{default:null,type:cc.Component.EventHandler},actionClaimReward:{default:null,type:cc.Component.EventHandler},actionResetCooldown:{default:null,type:cc.Component.EventHandler}},onLoad:function(){this.init(),this.generateBG(),this.startCountDown(4e3)},init:function(){this.playerRender.opacity=0,this.playerIdle.opacity=255,this.winNode.active=!1,this.gameOverNode.active=!1},generateBG:function(){for(var e=0;e<9;e++){var t=cc.instantiate(this.bgPrefab);this.bgLayer.addChild(t)}},startCountDown:function(e){var t=this;t.level.node.opacity=255,o=setInterval(function(){var i=(e-=1e3)/1e3;t.gameLabel.string=i,e<=0&&(clearInterval(o),t.gameLabel.string="Go...",t.scheduleOnce(function(){t.gameLabel.node.opacity=0,t.gameLabel.string="",t.playerRender.opacity=255,t.playerIdle.opacity=0,t.actionReady.emit()},1))},1e3)},onRewardedStatus:function(e){cc.log(e),0!=e&&(this.level.node.opacity=0,this.winAmount.string=e+" Credits",this.winNode.active=!0)},updateRewardedStatus:function(e){this.winText.string="Ready to play next stage to get "+e+"credits"},onDeadStatus:function(){this.gameOverNode.active=!0},onLevel:function(e){this.level.string="Stage : "+(e+1)},onClickClaimButton:function(){this.winNode.active=!1,this.actionClaimReward.emit(),cc.log("Claim Reward and Go to Lobby")},onClickQuitButton:function(){this.gameOverNode.active=!1,cc.log("Dead and Go to Lobby")},onClickNextButton:function(){this.actionContinue.emit(),this.winNode.active=!1,this.gameLabel.node.opacity=255,this.startCountDown(4e3)}}),cc._RF.pop()},{}],MapObjectController:[function(e,t){"use strict";cc._RF.push(t,"bfc4aF/VoZPXof2o/i7kBAB","MapObjectController"),cc.Class({extends:cc.Component,properties:{obObject:cc.Prefab,mapContainer:cc.Node,xOffset:1100,yOffset:230,scaleMultiplier:10},start:function(){},onLoad:function(){},onMapDataReady:function(e){this.mapContainer.removeAllChildren();for(var t=0;t<e.length;t++){var o=e[t];this._createObjects(o.type,o.x,o.y,o.width,o.height)}cc.log("Create Map Data!!!")},_createObjects:function(e,t,o,i,n){var a=cc.instantiate(this.obObject),s=e,r=this.scaleMultiplier*t+this.xOffset,l=this.scaleMultiplier*o+this.yOffset,c=this.scaleMultiplier*i,u=this.scaleMultiplier*n;a.getComponent("ObjectController").setupObj(s,r,l,c,u),this.mapContainer.addChild(a)}}),cc._RF.pop()},{}],NetworkController:[function(e,t){"use strict";cc._RF.push(t,"6cb77Ep1xxOEopPxJEk9/ki","NetworkController"),cc.Class({extends:cc.Component,properties:{serverEndpoint:"ws://minigames.shankoemee.net:2567/",autoConnectOnLoad:!0,autoJoinRoomOnConnected:!0,gameType:"shan_runner",skipToLevel:0,levelDuration:15,onPlayerMoved:{type:cc.Component.EventHandler,default:null},onMapDataReady:{type:cc.Component.EventHandler,default:null},onLifeStatus:{type:cc.Component.EventHandler,default:null},updateLifeStatus:{type:cc.Component.EventHandler,default:null},onRewardedStatus:{type:cc.Component.EventHandler,default:null},updateRewardedStatus:{type:cc.Component.EventHandler,default:null},onDeadStatus:{type:cc.Component.EventHandler,default:null},onLevel:{type:cc.Component.EventHandler,default:null}},onLoad:function(){this.autoConnectOnLoad&&this.connect("TODO:USERID","TODO:TOKEN")},start:function(){},connect:function(e,t){if(!e||!t)throw"UserID and LoginToken must be provided";this.userId=e,this.token=t;var o=new Colyseus.Client(this.serverEndpoint);if(!o)throw"Network Client error";this.client=o,this.autoJoinRoomOnConnected&&this.createRoom()},createRoom:function(){var e=this;if(!this.client)throw"Please connect to server frist";var t={token:this.token,level:this.skipToLevel,duration:this.levelDuration};this.client.create(this.gameType,t).then(function(t){console.log("joined!"),console.log(t),e.room=t,e._addListeners()}).catch(function(e){console.log(e)})},actionReady:function(){this._sendCmd("ready")},actionJump:function(){this._sendCmd("jump")},actionContinue:function(){this._sendCmd("continue")},actionClaimReward:function(){this._sendCmd("claim")},actionResetCooldown:function(){this._sendCmd("reset")},_addListeners:function(){var e=this,t=this.room;if(!t)throw"Must joined a room first";t.onMessage("*",function(e,t){console.log("received message:",e,"=>",t)}),t.onLeave(function(e){console.log("LEFT ROOM",e)}),t.onStateChange(function(){}),t.state.listen("gameMap",function(){console.log("gameMap updated"),e.onMapDataReady.emit([t.state.gameMap])}),t.state.listen("player",function(){console.log("player updated")}),t.state.player.listen("x",function(){e.onPlayerMoved.emit([t.state.player.x,t.state.player.y,t.state.player.status])}),t.state.player.listen("life",function(){e.onLifeStatus.emit([t.state.player.life])}),t.state.player.listen("life",function(o,i){o<i&&(console.log("player hit"),e.updateLifeStatus.emit([t.state.player.life]))}),t.state.stage.listen("rewardCollected",function(o,i){console.log("rewarded",o,i),null!=i&&e.onRewardedStatus.emit([t.state.stage.rewardCollected])}),t.state.stage.listen("level",function(){e.onLevel.emit([t.state.stage.level])}),t.state.stage.listen("status",function(o){console.log("game status changed"),3==o&&e.updateRewardedStatus.emit([t.state.stage.rewardNext]),4==o&&e.onDeadStatus.emit(),5==o&&cc.log("Game is in Cooldown")})},_sendCmd:function(e){var t=this.room;if(!t)throw"Must joined a room first";t.send("cmd",e)}}),cc._RF.pop()},{}],ObjectController:[function(e,t){"use strict";cc._RF.push(t,"9a433NcUQFKm53lcIWClevi","ObjectController"),cc.Class({extends:cc.Component,properties:{objImages:{default:[],type:cc.SpriteFrame}},onLoad:function(){},setupObj:function(e,t,o,i,n){switch(this.node.x=t,this.node.y=o,this.node.width=i,this.node.height=n,e){case 1:this.node.getComponent(cc.Sprite).spriteFrame=this.objImages[0];break;case 2:this.node.getComponent(cc.Sprite).spriteFrame=this.objImages[1];break;case 3:this.node.getComponent(cc.Sprite).spriteFrame=this.objImages[2];break;case 9:this.node.getComponent(cc.Sprite).spriteFrame=this.objImages[3],this.node.width=227,this.node.height=261}}}),cc._RF.pop()},{}],PlayerController:[function(e,t){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","PlayerController"),cc.Class({extends:cc.Component,properties:{playerContainer:cc.Node,playerRender:cc.Node,lifeNode:cc.Node,life:cc.Prefab,movementMultiplier:3,jumpMultiplier:0},onLoad:function(){this.playerNode||(this.playerNode=this.Node)},update:function(){},onPlayerMoved:function(e,t){this.playerContainer.setPosition(e*this.movementMultiplier,-220),this.playerRender.setPosition(-150,t*this.jumpMultiplier)},onLifeStatus:function(e){this.lifeNode.removeAllChildren();for(var t=0;t<e;t++){var o=cc.instantiate(this.life);this.lifeNode.addChild(o)}},updateLifeStatus:function(e){var t=this;t.lifeNode.removeAllChildren();for(var o=0;o<e;o++){var i=cc.instantiate(t.life);t.lifeNode.addChild(i)}t.playerRender.color=new cc.color(255,0,0,255),t.scheduleOnce(function(){t.playerRender.color=new cc.color(255,255,255,255)},.4)},jumpAnimation:function(){var e=this;e.playerRender.getComponent("sp.Skeleton").setAnimation(0,"jump",!1),e.scheduleOnce(function(){e.playerRender.getComponent("sp.Skeleton").setAnimation(0,"animation",!0)},1.2)}}),cc._RF.pop()},{}]},{},["CameraController","GameMainController","MapObjectController","NetworkController","ObjectController","PlayerController"]);
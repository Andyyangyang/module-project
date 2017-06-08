define("service/commonErrors",["require","exports","module"],function(e,t){"use strict";t[100001]="数据库连接错误",t[100002]="数据库查询错误",t[100003]="请求参数错误";var n=function(e){}}),define("service/ajax",["require","exports","module","./commonErrors"],function(e,t){var n=e("./commonErrors"),r=/\{([^\}]+)\}/g,i=[];$(window).bind("beforeunload",function(){$.each(i,function(e,t){t&&t.abort()})});var s=function(e){for(var t in e)if(e[t]&&e[t].constructor===File)return!0;return!1},o=function(e){var t=new FormData;for(var n in e)t.append(n,e[n]);return t};t.post=function(e,t,n){t=t||{},n=n||{};var u=e,a=!1;e=e.replace(r,function(e,n){return a=!0,t[n]}),a&&(t.__url__=u),e=window.rootBase+e;var f={url:e,data:t,method:"POST",type:"POST",dataType:"json",cache:!1,timeout:2e4,beforeSend:n.beforeSend||function(){var e=n.holder;if(e){var t=e.children(".data-loading");t[0]?t.data("count",+t.data("count")+1):(t=$('<div class="data-loading data-loading" data-count="1">'),e.append(t)),e.css("position")==="static"&&!e.hasClass("data-loading-relative")&&e.addClass("data-loading-relative")}},contentType:"application/x-www-form-urlencoded;charset=UTF-8",async:n.sync?!1:!0};n.headers&&(f.headers=n.headers),s(t)&&(f.data=o(t),f.contentType=!1,f.processData=!1);var l=$.ajax(f);return i.push(l),l.pipe(function(e){var t=n.holder;if(t){var r=t.children(".data-loading"),i=+r.data("count");i>1?r.data("count",i-1):t.removeClass("data-loading-relative").find(".data-loading").remove()}if(e.status===200)return e;if(e.status===302)window.location.href=window.rootBase+"/login";else{if(e.status!==403){var s=$.Deferred();return s.reject(e),s.promise()}alert("你还没有此权限，马上去申请权限~")}}).fail(function(e){e.status!==200&&e.statusText&&console.log(e.statusText)}).always(function(){for(var e=0;e<i.length;e++)i[e]===l&&i.splice(e--,1)})},t.jsonp=function(e,t,r){return $.ajax({url:e,data:JSON.stringify(t),dataType:"jsonp",timeout:r,scriptCharset:"UTF-8"}).pipe(function(e){if(e.status===200)return e;var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()})}}),define("service/task-list",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getTaskList=function(e){return n.jsonp("/api-prefix/task/list",{ts:(new Date).getTime()},e)}}),define("dep/eventEmitter",["require","exports","module"],function(e,t){var n=Array.prototype.slice,r=function(){this.tasks={},this.fired={}};return r.tasks={},r.fired={},r.on=r.prototype.on=function(e,t){if(!e||!t)return!1;var n=this.tasks[e];if(!n){n=this.tasks[e]=[];var r=this.fired[e];r&&t.apply(null,r)}return n.push(t),function(){for(var e=0;e<n.length;e++)n[e]===t&&n.splice(e--,1)}},r.fire=r.prototype.fire=function(e){var t=this.tasks,r=n.call(arguments,1);if(!e)return!1;this.fired[e]=r;var i=t[e];if(!i)return!1;var s=i.length;if(s===0)return!1;for(var o=0;o<i.length;o++)i[o].apply(null,r)},r.un=r.prototype.un=function(e,t){if(!e)return this.tasks={},!0;var n=this.tasks[e];if(!n)return!1;if(!t)return n.length=0,!0;var r=!1;for(var i=0;i<n.length;i++)n[i]===t&&(n.splice(i--,1),r=!0);return r},r.once=r.prototype.once=function(e,t){var n=this,r=function(){t.apply(null,arguments),n.un(e,r)};this.on(e,r)},r.init=function(){return new r},r}),define("dep/moduleHandler",["require","exports","module"],function(e,t){"use strict";var n=function(e){if(!e)return;r(e);var t=e.subModules;if(!t)return;for(var n=0;n<t.length;n++){var i=t[n];i&&$.isFunction(i.dispose)&&(t.splice(n,1),n--,i.dispose())}},r=function(e){var t=e.parentModule;if(!t)return;var n=t.subModules;for(var r=0;r<n.length;r++){var i=n[r];i===e&&(n.splice(r,1),r--)}};t.init=function(e,n){e=e||$("body");var r=e.size();if(r>1)$.each(e,function(){t.init($(this),n)});else if(r===1){var i=e.data("modulePath");i?t.load(i,e,n):t.init(e.children(),n)}},t.load=function(r,i,s){var o=i.data(),u=o.interceptorPath,a=function(e,r){if(e){$.isFunction(e)&&(e=new e),e.element=i,e.data=o;if($.isFunction(e.init)){var u=e.init(r);u&&u.done?u.done(function(n){t.init(i.children(),e)}):t.init(i.children(),e)}else t.init(i.children(),e);if(s){var a=s.subModules;a||(a=s.subModules=[]),a.push(e),e.parentModule=s}var f=e.dispose;$.isFunction(f)?e.dispose=function(){n(this),f.apply(this,arguments)}:e.dispose=function(){n(this)}}};e([r],function(t){u?e([u],function(e){if(e){e.element=i,e.data=o;if($.isFunction(e.init)){var n=e.init();n&&n.done?n.done(function(e){a(t,e)}):a(t,n)}else a(t)}}):a(t)})}}),define("task-list/sub-module-1",["require","exports","module","dep/eventEmitter","dep/moduleHandler"],function(e,t){"use strict";var n=e("dep/eventEmitter");t.init=function(n){var r=this.element,i=this.data;setTimeout(function(){r.html(Simplite.render("task-list-sub-module-1",{ip:i.ip+"\nasdf\ndsdff",list:[{date:"2015-10-10",natureFlow:100,scoreCost:222,tgFlow:30},{date:"2015-10-11",natureFlow:381,scoreCost:334,tgFlow:41},{date:"2015-10-12",natureFlow:230,scoreCost:456,tgFlow:23}]})),e("dep/moduleHandler").init(r.children(),t)},1e3);return;var s},t.dispose=function(){console.log("dispose task-list/sub-module-1")}}),define("task-list/sub-module-2",["require","exports","module","dep/eventEmitter"],function(e,t){"use strict";var n=e("dep/eventEmitter");t.init=function(){var e=this.element,t=this.data;e.html(Simplite.render("task-list-sub-module-2","哈哈测试传递的参数")),e.on("click","div",function(){n.fire("sub2-clicked",{id:23})})},t.dispose=function(){console.log("dispose task-list/sub-module-2")}}),define("service/common/base-service",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getData=function(e,t){return n.post("/api-prefix/common/base",e,t)}}),define("task-list/interceptor/base-data",["require","exports","module","service/common/base-service"],function(e,t){var n=e("service/common/base-service");t.init=function(){return n.getData().pipe(function(e){if(e.status===200)return e.data})}}),define("task-list/instance-demo",["require","exports","module"],function(e,t){"use strict";var n=function(){};return n.prototype.init=function(){var e=this;console.log(this.element),this.element.on("click","button",function(){e.dispose()})},n.prototype.dispose=function(){console.log("销毁了instance-demo",this.data.type),this.element.remove()},n}),Simplite.compiles["task-list-sub-module-1"]=function(e){return function(e){"use strict";var t=this,n="<div> http:\\/\\/www.baidu.com/aaab/bbb.com "+t.defaultAttr(e.ip.replace(/\n/g,"<br />"))+' </div><table class="table"><thead><tr><th class="width-126">日期</th><th>浏览量</th><th>消耗学分</th><th>推广增量</th></tr></thead><tbody>',r;n+="";for(var i=0,s=e.list.length;i<s;i++)r=e.list[i],n+="<tr><td> "+t.defaultAttr(r.date)+" </td><td>"+t.defaultAttr(r.natureFlow+r.tgFlow)+"</td><td>"+t.defaultAttr(r.scoreCost)+'</td><td class="text-highlight"> '+t.defaultAttr(r.tgFlow)+" </td></tr>";return n+='</tbody></table><div data-module-path="task-list/sub-module-2"></div> ',n}.call(Simplite,e)},Simplite.compiles["task-list-sub-module-2"]=function(e){return function(e){"use strict";var t=this,n='<div><a href="http://www.baidu.com">这个是子模块2</a></div>';return n+=t.include("task-list-sub2-include",e),n+=" ",n}.call(Simplite,e)},Simplite.compiles["task-list-sub2-include"]=function(e){return function(e){"use strict";var t=this,n="<p> 通过include传递参数"+t.defaultAttr(e)+" </p> ";return n}.call(Simplite,e)},define("task-list/main",["require","exports","module","service/task-list","./sub-module-1","./sub-module-2","./interceptor/base-data","./instance-demo","dep/eventEmitter"],function(e,t){"use strict";var n=e("service/task-list");e("./sub-module-1"),e("./sub-module-2"),e("./interceptor/base-data"),e("./instance-demo");var r=e("dep/eventEmitter"),i;t.init=function(e){console.log("模块能获取对应的interceptor的返回值：",e),i=this.element;var s=this.data;return i.on("click",".main",function(){console.log("module main clicked"),t.dispose()}),r.on("sub2-clicked",function(e){alert(e.id)}),i.find("div").data("ip",e.ip),n.getTaskList({holder:i}).done(function(e){console.log("这个是获取到的taskList数据，",e)})},t.dispose=function(){console.log("dispose task-list/main")}});
define("service/commonErrors",["require","exports","module"],function(e,t){"use strict";t[100001]="数据库连接错误",t[100002]="数据库查询错误",t[100003]="请求参数错误";var n=function(e){}}),define("service/ajax",["require","exports","module","./commonErrors"],function(e,t){var n=e("./commonErrors"),r=/\{([^\}]+)\}/g,i=[];$(window).bind("beforeunload",function(){$.each(i,function(e,t){t&&t.abort()})});var s=function(e){for(var t in e)if(e[t]&&e[t].constructor===File)return!0;return!1},o=function(e){var t=new FormData;for(var n in e)t.append(n,e[n]);return t};t.post=function(e,t,n){t=t||{},n=n||{};var u=e,a=!1;e=e.replace(r,function(e,n){return a=!0,t[n]}),a&&(t.__url__=u),e=window.rootBase+e;var f={url:e,data:t,method:"POST",type:"POST",dataType:"json",cache:!1,timeout:2e4,beforeSend:n.beforeSend||function(){var e=n.holder;if(e){var t=e.children(".data-loading");t[0]?t.data("count",+t.data("count")+1):(t=$('<div class="data-loading data-loading" data-count="1">'),e.append(t)),e.css("position")==="static"&&!e.hasClass("data-loading-relative")&&e.addClass("data-loading-relative")}},contentType:"application/x-www-form-urlencoded;charset=UTF-8",async:n.sync?!1:!0};n.headers&&(f.headers=n.headers),s(t)&&(f.data=o(t),f.contentType=!1,f.processData=!1);var l=$.ajax(f);return i.push(l),l.pipe(function(e){var t=n.holder;if(t){var r=t.children(".data-loading"),i=+r.data("count");i>1?r.data("count",i-1):t.removeClass("data-loading-relative").find(".data-loading").remove()}if(e.status===200)return e;if(e.status===302)window.location.href=window.rootBase+"/login";else{if(e.status!==403){var s=$.Deferred();return s.reject(e),s.promise()}alert("你还没有此权限，马上去申请权限~")}}).fail(function(e){e.status!==200&&e.statusText&&console.log(e.statusText)}).always(function(){for(var e=0;e<i.length;e++)i[e]===l&&i.splice(e--,1)})},t.jsonp=function(e,t,r){return $.ajax({url:e,data:JSON.stringify(t),dataType:"jsonp",timeout:r,scriptCharset:"UTF-8"}).pipe(function(e){if(e.status===200)return e;var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()})}}),define("service/product-list",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getProductList=function(e){return n.post("/api-prefix/product/list",null,e)},t.deleteProduct=function(e,t){return n.post("/api-prefix/product/delete/{id}",e,t)}}),define("common/utils",["require","exports","module"],function(e,t){t.deepCopy=function(e){var t,n=e.constructor;return function r(e,n,i){var s=e&&e.constructor,o,u,a,f,l=n===undefined;if(s===Object){o=l?t={}:n[i]={};for(u in e)r(e[u],o,u)}else if(s===Array){a=0,f=e.length,o=l?t=[]:n[i]=[];while(a<f)r(e[a],o,a++)}else if(s===Function)try{n[i]=(new Function("return "+e.toString()))()}catch(c){n[i]=e}else typeof e=="object"?n[i]=new s(e):n[i]=e}(e),t},t.refreshQuery=function(e,t,n){if(!e)return"";if(typeof e=="string"){var r={};r[e]=t,e=r}else n=t;var i=location.search;n===!0&&(i=location.hash);if(!i){var u=[];for(var s in e)u.push(s+"="+e[s]);return u.sort(),"?"+u.join("&")}for(var s in e){var o=!1;i=i.replace(new RegExp("([?&]"+s+"=)([^&$]*)"),function(t,n,r){return o=!0,n+e[s]}),o||(i+="&"+s+"="+e[s])}return i},t.getQuery=function(e,t){var n=location.search,r={};if(!arguments.length)return n?(n.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,n){r[t]=decodeURIComponent(n)}),r):r;if(typeof e=="string")t&&(n=location.hash);else if(e)return location.hash.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,n){r[t]=decodeURIComponent(n)}),r;var i=(new RegExp("[?&]"+e+"=([^&$]*)")).exec(n);return i&&decodeURIComponent(i[1])},t.refreshFrag=function(e,n){return t.refreshQuery(e,n,!0)},t.getFrag=function(e){return typeof e=="string"?t.getQuery(e,!0):t.getQuery(!0)},t.format=function(e,t,n){return t=t||",",n=n||3,(""+e).replace(new RegExp("(\\d{1,"+n+"})(?=(\\d{"+n+"})+(?:$|\\.))","g"),"$1"+t)},t.parseToDate=function(e){return t.toDate(t.parseToTimestamp(e))},t.parseToTimestamp=function(e){return Date.parse(e.replace(/\-/g,"/"))},t.addDay=function(e,n){var r=t.toDate(t.toTimestamp(e));return r.setDate(r.getDate()+n),r},t.toYMD=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return n<10&&(n="0"+n),r<10&&(r="0"+r),t+"-"+n+"-"+r},t.toYMDHMS=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10&&(o="0"+o),t+"-"+n+"-"+r+" "+i+":"+s+":"+o},t.toMDHmsS=function(e){var t=e.getMonth()+1,n=e.getDate(),r=e.getHours(),i=e.getMinutes(),s=e.getSeconds(),o=e.getMilliseconds();return t<10&&(t="0"+t),n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10?o="00"+o:o<100&&(o="0"+o),t+"-"+n+" "+r+":"+i+":"+s+"."+o},t.toTimestamp=function(e){return e.getTime()},t.toDate=function(e){return new Date(e)},t.compareTo=function(e,n){return t.toTimestamp(e)-t.toTimestamp(n)},t.offsetOfWeek=function(e){return(e.getDay()||7)-1},t.firstOfWeek=function(e){return t.addDay(e,-t.offsetOfWeek(e))},t.getFormData=function(e,t){var n={};return t=t||"[name]",e.find(t).each(function(){if(this.type==="radio"){this.checked&&(n[this.name]=this.value);return}if(this.type==="checkbox"&&!this.checked)return;if(this.type==="file"){this.files[0]&&(n[this.name]=this.files[0]);return}var e=n[this.name];e?(typeof e=="string"&&(n[this.name]=[e]),n[this.name].push(this.value)):n[this.name]=this.value}),n};var n=t.formatJSON=function(e,t,r,i){if(null==e)return""+e;r=r!=null?r:"    ",i=i||"";var s=e.constructor;if(s===String)return t?'<span class="json-string-value">"'+e+'"</span>':'"'+e+'"';if(s===Number||s===Boolean)return t?'<span class="json-number-value">'+e+"</span>":e;if(s===Array){var o=t?'<span class="json-array-tag">[</span>\n':"[\n";for(var u=0,a=e.length;u<a-1;u++)o+=i+r+n(e[u],t,r,i+r)+",\n";return o+=i+r+n(e[a-1],t,r,i+r)+"\n",o+i+(t?'<span class="json-array-tag">]</span>':"]")}if(s===Object){var f=t?'<span class="json-object-tag">{</span>\n':"{\n",l=!0;for(var c in e)l=!1,f+=i+r+(t?'<span class="json-object-key">"'+c+'"'+"</span>":'"'+c+'"')+": "+n(e[c],t,r,i+r)+",\n";return l||(f=f.slice(0,-2)),f+"\n"+i+(t?'<span class="json-object-tag">}</span>':"}")}}}),define("common/store",["require","exports","module","./utils"],function(e,t){"use strict";var n=e("./utils"),r={},i=Array.prototype.slice;t.set=function(e,t){typeof e=="string"&&(r[e]=t)},t.get=function(e){return arguments.length?r[e]:r},t.dump=function(e){var t={};if(arguments.length)if(e.constructor===Array)for(var i=0,s=e.length;i<s;i++){var o=e[i];t[o]=n.deepCopy(r[o])}else t[e]=n.deepCopy(r[e]);else for(var o in r)t[o]=n.deepCopy(r[o]);return t}}),define("product-list/product-list",["require","exports","module","service/product-list","common/store","common/utils"],function(e,t){var n=e("service/product-list"),r=e("common/store");Simplite.addFilter("formatJson",e("common/utils").formatJSON),t.init=function(){var e=this.element;n.getProductList({holder:e}).done(function(t){if(t.status===200){var n=t.data,r=Simplite.render("product-list-product-list",n);e.html(r)}else console.log("获取业务线列表出错")}),e.on("click",".delete-product",function(){n.deleteProduct({id:r.get("productId")}).done(function(e){e.status===200?window.location.reload(!0):alert("删除产品线失败，请重试")})}).on("click",".to-set-delete",function(){r.set("productId",$(this).data("id")),e.find(".deleted-product-name").text($(this).data("name"))})}}),function(e,t){var n=t();typeof define=="function"?define("dep/class",[],function(){return n}):e.Class=n}(this,function(){"use strict";var e=function(){},t=function(e){return n(this.superClass,e)},n=function(e,t){while(e){var r=e.prototype[t];return r?r:n(e.prototype.superClass)}},r=function(e){return new this(e)},i={create:function(s,o){var u=null;i!==this&&(u=this),u===null?typeof s=="function"?u=s:(o=s,s=null):o||(o=s,s=null),o=o||{};var a=function(){for(var e in a.defaultOptions||{})this[e]||(this[e]=a.defaultOptions[e]);this.init.apply(this,arguments)};u&&(e.prototype=u.prototype,a.prototype=new e,e.prototype=null);for(var f in o)if(o.hasOwnProperty(f)){var l=o[f],c=!1;typeof l!="function"&&(c=l.override,l=l.handler),a.prototype[f]=function(e,t,r,i){return function(){if(!i){var s;t&&(s=n(t,r),s&&s.apply(this,arguments))}return e.apply(this,arguments)}}(l,u,f,c)}return u&&(a.prototype.superClass=u,a.prototype.constructor=a,a.prototype.getSuper=t),a.create=i.create,a.init=r,a}};return i.create({init:function(e){e=e||{};for(var t in e)this[t]=e[t]}})}),define("dep/eventEmitter",["require","exports","module"],function(e,t){var n=Array.prototype.slice,r=function(){this.tasks={},this.fired={}};return r.tasks={},r.fired={},r.on=r.prototype.on=function(e,t){if(!e||!t)return!1;var n=this.tasks[e];if(!n){n=this.tasks[e]=[];var r=this.fired[e];r&&t.apply(null,r)}return n.push(t),function(){for(var e=0;e<n.length;e++)n[e]===t&&n.splice(e--,1)}},r.fire=r.prototype.fire=function(e){var t=this.tasks,r=n.call(arguments,1);if(!e)return!1;this.fired[e]=r;var i=t[e];if(!i)return!1;var s=i.length;if(s===0)return!1;for(var o=0;o<i.length;o++)i[o].apply(null,r)},r.un=r.prototype.un=function(e,t){if(!e)return this.tasks={},!0;var n=this.tasks[e];if(!n)return!1;if(!t)return n.length=0,!0;var r=!1;for(var i=0;i<n.length;i++)n[i]===t&&(n.splice(i--,1),r=!0);return r},r.once=r.prototype.once=function(e,t){var n=this,r=function(){t.apply(null,arguments),n.un(e,r)};this.on(e,r)},r.init=function(){return new r},r}),define("dep/eventable",["require","exports","module","./class","./eventEmitter"],function(e,t){var n=Array.prototype.slice;return e("./class").create({init:function(){var t=e("./eventEmitter").init();this.tasks=t.tasks,this.fired=t.fired,this.on=t.on,this.un=t.un,this.fire=function(){var e=arguments;setTimeout(function(){t.fire.apply(t,e)},0)}}})}),define("component/ui",["require","dep/eventable"],function(e){var t=e("dep/eventable").create({init:function(e){var t=this;this.element=$(this.element),this.on("init",function(){t.bindEvent&&t.bindEvent()}),this.fire("init",arguments)},dispose:function(){this.element.remove(),this.fire("dispose")}});return t}),Simplite.compiles["pager-template"]=function(e){return function(e){"use strict";var t=this,n='<ul class="pagination"><li class="pre-group';e.currentGroup<=1&&(n+=" disabled"),n+='"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';var r=(e.currentGroup-1)*e.displayPageCount;for(var i=r+1;i<=r+e.displayPageCount;i++){if(i>e.totalPage)break;n+='<li class="'+t.defaultAttr(i==e.currentPage?"active":"page-btn")+'" data-page="'+t.defaultAttr(i)+'"><a href="javascript:;">'+t.defaultAttr(t.filter("format-length",i,e.totalPage))+"</a></li>"}return n+='<li class="next-group',e.currentGroup>=e.totalGroup&&(n+=" disabled"),n+='"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul> ',n}.call(Simplite,e)},define("component/widgets/pager/pager",["require","../../ui"],function(e){(function(){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=".pager-widget ul.pagination { margin: 0; } ",e.appendChild(t)})(),Simplite.addFilter("format-length",function(e,t){return e});var t=e("../../ui").create({init:function(){this.element.addClass("pager-widget")},bindEvent:function(){var e=this;this.element.on("click",this.actions.preGroup,function(){e.toPreGroup($(this))}).on("click",this.actions.nextGroup,function(){e.toNextGroup($(this))}).on("click",this.actions.pageBtn,function(){e.toPage($(this).data("page"))})},render:function(e){$.extend(this,e),this.totalGroup=parseInt((this.totalPage-1)/this.displayPageCount)+1;var t=Simplite.render("pager-template",{currentPage:this.currentPage,pageSize:this.pageSize,totalPage:this.totalPage,displayPageCount:this.displayPageCount,currentGroup:this.currentGroup,totalGroup:this.totalGroup});this.element.html(t)},toPreGroup:function(e){if(e.hasClass("disabled"))return;this.currentGroup--,this.render()},toNextGroup:function(e){if(e.hasClass("disabled"))return;this.currentGroup++,this.render()},toPage:function(e){e=parseInt(e);if(isNaN(e))return;e<0&&(e=0),e>this.totalPage&&(e=this.totalPage),this.currentPage=e,this.currentGroup=parseInt((this.currentPage-1)/this.displayPageCount)+1,this.render(),this.fire("page",{currentPage:this.currentPage,pageSize:this.pageSize,currentGroup:this.currentGroup,totalPage:this.totalPage,displayPageCount:this.displayPageCount})}});return t.defaultOptions={actions:{pageBtn:".page-btn",preGroup:".pre-group",nextGroup:".next-group"},currentPage:1,pageSize:20,totalPage:1,displayPageCount:10,currentGroup:1,totalGroup:1},t}),Simplite.compiles["product-list-product-list"]=function(e){return function(e){"use strict";var t=this,n='<div class="row"><div class="item-title">业务线列表</div><div class="row item-body"><a class="btn btn-primary add-product float-right" href="'+t.defaultAttr(window.rootBase)+'/product/add" role="button">添加业务线</a><div class="product-table"><table class="table table-bordered"><thead><tr><th style="width: 90px;">业务线ID</th><th>业务线名称</th><th>接口人</th><th style="width: 100px;">手机号</th><th>属性配置</th><th>操作</th></tr></thead><tbody class="product-tbody">';return n+=t.include("product-list-product-list-tbody",e),n+='</tbody></table></div></div></div><div class="modal fade" id="delete-product-modal" tabindex="-1" role="dialog" aria-labelledby="delete-product-label"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="delete-product-label">删除业务线提示框</h4></div><div class="modal-body"> 确认要删除<span class="deleted-product-name"></span>吗？ </div><div class="modal-footer"><button type="button" class="btn btn-primary delete-product">确认</button><button type="button" class="btn btn-default" data-dismiss="modal">取消</button></div></div></div></div> ',n}.call(Simplite,e)},Simplite.compiles["product-list-product-list-tbody"]=function(e){return function(e){"use strict";var t=this,n="",r=e.length;if(r)for(var i=0;i<r;i++){var s=e[i];n+="<tr><td>"+t.defaultAttr(s.productId)+"</td><td>"+t.defaultAttr(s.productName)+"</td><td>"+t.defaultAttr(s.owner)+"</td><td>"+t.defaultAttr(s.ownerPhone)+"</td><td><pre>"+t.defaultAttr(t.filter("formatJson",s.attrs,!0))+'</pre></td><td><a class="btn btn-primary" href="'+t.defaultAttr(window.rootBase)+"/product/add?id="+t.defaultAttr(s.productId)+'">编辑</a><span class="separator">|</span><a href="#" class="btn btn-danger to-set-delete" data-id="'+t.defaultAttr(s.productId)+'" data-name="'+t.defaultAttr(s.productName)+'" data-toggle="modal" data-target="#delete-product-modal">删除</a></td></tr>'}else n+='<tr><td colspan="6"><center>没有查询到结果</center></td></tr>';return n+=" ",n}.call(Simplite,e)},define("product-list/main",["require","exports","module","./product-list","component/widgets/pager/pager"],function(e,t){e("./product-list");var n=e("component/widgets/pager/pager");t.init=function(){var e=new n({element:this.element.find(".pager-container")});e.on("page",function(e){console.log(e)}),e.render({totalPage:134,displayPageCount:10})}});
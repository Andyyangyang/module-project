define("service/commonErrors",["require","exports","module"],function(e,t){"use strict";t[100001]="数据库连接错误",t[100002]="数据库查询错误",t[100003]="请求参数错误";var n=function(e){}}),define("service/ajax",["require","exports","module","./commonErrors"],function(e,t){var n=e("./commonErrors"),r=/\{([^\}]+)\}/g,i=[];$(window).bind("beforeunload",function(){$.each(i,function(e,t){t&&t.abort()})});var s=function(e){for(var t in e)if(e[t]&&e[t].constructor===File)return!0;return!1},o=function(e){var t=new FormData;for(var n in e)t.append(n,e[n]);return t};t.post=function(e,t,n){t=t||{},n=n||{};var u=e,a=!1;e=e.replace(r,function(e,n){return a=!0,t[n]}),a&&(t.__url__=u),e=window.rootBase+e;var f={url:e,data:t,method:"POST",type:"POST",dataType:"json",cache:!1,timeout:2e4,beforeSend:n.beforeSend||function(){var e=n.holder;if(e){var t=e.children(".data-loading");t[0]?t.data("count",+t.data("count")+1):(t=$('<div class="data-loading data-loading" data-count="1">'),e.append(t)),e.css("position")==="static"&&!e.hasClass("data-loading-relative")&&e.addClass("data-loading-relative")}},contentType:"application/x-www-form-urlencoded;charset=UTF-8",async:n.sync?!1:!0};n.headers&&(f.headers=n.headers),s(t)&&(f.data=o(t),f.contentType=!1,f.processData=!1);var l=$.ajax(f);return i.push(l),l.pipe(function(e){var t=n.holder;if(t){var r=t.children(".data-loading"),i=+r.data("count");i>1?r.data("count",i-1):t.removeClass("data-loading-relative").find(".data-loading").remove()}if(e.status===200)return e;if(e.status===302)window.location.href=window.rootBase+"/login";else{if(e.status!==403){var s=$.Deferred();return s.reject(e),s.promise()}alert("你还没有此权限，马上去申请权限~")}}).fail(function(e){e.status!==200&&e.statusText&&console.log(e.statusText)}).always(function(){for(var e=0;e<i.length;e++)i[e]===l&&i.splice(e--,1)})},t.jsonp=function(e,t,r){return $.ajax({url:e,data:JSON.stringify(t),dataType:"jsonp",timeout:r,scriptCharset:"UTF-8"}).pipe(function(e){if(e.status===200)return e;var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()})}}),define("service/product-add",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getProduct=function(e,t){return n.post("/api-prefix/product/get",e,t)},t.saveProduct=function(e,t){return e.ProductId?n.post("/api-prefix/product/edit",e,t):n.post("/api-prefix/product/add",e,t)}}),function(e,t){var n=t();typeof define=="function"?define("common/Validator",[],function(){return n}):typeof require=="undefined"&&(e.Validator=n)}(this,function(){var e=/^validate([A-Z])/,t=/\s*\:\s*/,n=/\s*,\s*/,r=".for-validator",i=function(t){var n=$(t),r={element:n[0]};if(!n[0])return typeof t=="string"&&(r.name=$.trim(t)),r;var i=n.data();return $.each(i,function(t,n){e.test(t)&&(r[t.replace(e,function(e,t){return t.toLowerCase()})]=n)}),r},s=function(e){$.extend(this,e),this.verifies={}};s.prototype.init=function(e){e=$(e||"body");var t=this,n=e.find("[data-validate-name]");return n.each(function(){t.add(this)}),t},s.prototype.add=function(e,t){var n=this,s=i(e),u=s.name,a={element:s.element,rules:n.elements[u],notifier:n.notifier[u]||n.notifier["*"]},f=n.vals&&n.vals[u];f&&(a.val=f),t=$.extend({},a,t,s);var l=this.verifies[u]=new o(t);l.element&&$(l.element).on((l.trigger||"change")+r,function(){n.validate(u)})},s.prototype.remove=function(e){var t=this.verifies[e];t&&(delete this.verifies[e],delete this.elements[e],delete this.notifier[e],this.vals&&delete this.vals[e],$(t.element).off((t.trigger||"change")+r))},s.prototype.parseResponse=function(e){return typeof e=="boolean"?e:!e.code&&e.data},s.prototype.validate=function(e){var r=$.Deferred(),i=this;if(!e){var s=[];$.each(this.verifies,function(e){s.push(i.validate(e))}),$.when.apply(null,s).done(function(){var e=!0;$.each(arguments,function(t,n){if(!n)return e=!1}),r.resolve(e)})}else{var o=i.verifies[e],u=o.rules,a=o.notifier,f=u.length,l=o.element,c=function(s){var h=u[s],p=null,d=null;if(typeof h=="string"){var v=h.split(t);p=v[0],v[1]&&(d=v[1].split(n)),h=i.rules[p]}else for(p in h){h=h[p];break}var m=o.val(o.element),g=h.apply({element:o.element,value:m,args:d},d||[m]),y=function(t){s===f-1?(r.resolve(t),a.call(l,t,p,e)):t?t.force?(r.resolve(!0),a.call(l,!0,p,e)):c(s+1):(r.resolve(!1),a.call(l,!1,p,e))};g.done?g.done(function(t){y(i.parseResponse.call({element:l,methodName:p,name:e},t))}):y(g)};c(0)}return r.promise()};var o=function(e){$.extend(this,e)};return o.prototype.val=function(){return $.trim($(this.element).val())},s}),define("common/utils",["require","exports","module"],function(e,t){t.deepCopy=function(e){var t,n=e.constructor;return function r(e,n,i){var s=e&&e.constructor,o,u,a,f,l=n===undefined;if(s===Object){o=l?t={}:n[i]={};for(u in e)r(e[u],o,u)}else if(s===Array){a=0,f=e.length,o=l?t=[]:n[i]=[];while(a<f)r(e[a],o,a++)}else if(s===Function)try{n[i]=(new Function("return "+e.toString()))()}catch(c){n[i]=e}else typeof e=="object"?n[i]=new s(e):n[i]=e}(e),t},t.refreshQuery=function(e,t,n){if(!e)return"";if(typeof e=="string"){var r={};r[e]=t,e=r}else n=t;var i=location.search;n===!0&&(i=location.hash);if(!i){var u=[];for(var s in e)u.push(s+"="+e[s]);return u.sort(),"?"+u.join("&")}for(var s in e){var o=!1;i=i.replace(new RegExp("([?&]"+s+"=)([^&$]*)"),function(t,n,r){return o=!0,n+e[s]}),o||(i+="&"+s+"="+e[s])}return i},t.getQuery=function(e,t){var n=location.search,r={};if(!arguments.length)return n?(n.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,n){r[t]=decodeURIComponent(n)}),r):r;if(typeof e=="string")t&&(n=location.hash);else if(e)return location.hash.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,n){r[t]=decodeURIComponent(n)}),r;var i=(new RegExp("[?&]"+e+"=([^&$]*)")).exec(n);return i&&decodeURIComponent(i[1])},t.refreshFrag=function(e,n){return t.refreshQuery(e,n,!0)},t.getFrag=function(e){return typeof e=="string"?t.getQuery(e,!0):t.getQuery(!0)},t.format=function(e,t,n){return t=t||",",n=n||3,(""+e).replace(new RegExp("(\\d{1,"+n+"})(?=(\\d{"+n+"})+(?:$|\\.))","g"),"$1"+t)},t.parseToDate=function(e){return t.toDate(t.parseToTimestamp(e))},t.parseToTimestamp=function(e){return Date.parse(e.replace(/\-/g,"/"))},t.addDay=function(e,n){var r=t.toDate(t.toTimestamp(e));return r.setDate(r.getDate()+n),r},t.toYMD=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return n<10&&(n="0"+n),r<10&&(r="0"+r),t+"-"+n+"-"+r},t.toYMDHMS=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10&&(o="0"+o),t+"-"+n+"-"+r+" "+i+":"+s+":"+o},t.toMDHmsS=function(e){var t=e.getMonth()+1,n=e.getDate(),r=e.getHours(),i=e.getMinutes(),s=e.getSeconds(),o=e.getMilliseconds();return t<10&&(t="0"+t),n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10?o="00"+o:o<100&&(o="0"+o),t+"-"+n+" "+r+":"+i+":"+s+"."+o},t.toTimestamp=function(e){return e.getTime()},t.toDate=function(e){return new Date(e)},t.compareTo=function(e,n){return t.toTimestamp(e)-t.toTimestamp(n)},t.offsetOfWeek=function(e){return(e.getDay()||7)-1},t.firstOfWeek=function(e){return t.addDay(e,-t.offsetOfWeek(e))},t.getFormData=function(e,t){var n={};return t=t||"[name]",e.find(t).each(function(){if(this.type==="radio"){this.checked&&(n[this.name]=this.value);return}if(this.type==="checkbox"&&!this.checked)return;if(this.type==="file"){this.files[0]&&(n[this.name]=this.files[0]);return}var e=n[this.name];e?(typeof e=="string"&&(n[this.name]=[e]),n[this.name].push(this.value)):n[this.name]=this.value}),n};var n=t.formatJSON=function(e,t,r,i){if(null==e)return""+e;r=r!=null?r:"    ",i=i||"";var s=e.constructor;if(s===String)return t?'<span class="json-string-value">"'+e+'"</span>':'"'+e+'"';if(s===Number||s===Boolean)return t?'<span class="json-number-value">'+e+"</span>":e;if(s===Array){var o=t?'<span class="json-array-tag">[</span>\n':"[\n";for(var u=0,a=e.length;u<a-1;u++)o+=i+r+n(e[u],t,r,i+r)+",\n";return o+=i+r+n(e[a-1],t,r,i+r)+"\n",o+i+(t?'<span class="json-array-tag">]</span>':"]")}if(s===Object){var f=t?'<span class="json-object-tag">{</span>\n':"{\n",l=!0;for(var c in e)l=!1,f+=i+r+(t?'<span class="json-object-key">"'+c+'"'+"</span>":'"'+c+'"')+": "+n(e[c],t,r,i+r)+",\n";return l||(f=f.slice(0,-2)),f+"\n"+i+(t?'<span class="json-object-tag">}</span>':"}")}}}),define("product-add/product-form",["require","exports","module","service/product-add","common/Validator","common/utils"],function(e,t){var n=e("service/product-add"),r=e("common/Validator"),i=e("common/utils").getQuery("id"),s=function(e){var t={};return e.find("[name]").each(function(){t[this.name]=this.value}),t},o={productName:{required:"业务线名称不能为空"},owner:{required:"接口人不能为空"},ownerPhone:{required:"接口人电话不能为空",phone:"请输入正确的手机号码"},ownerMail:{required:"接口人邮箱不能为空",email:"请输入正确的邮箱地址"}},u=new r({rules:{required:function(e){var t=this.value;return e==="false"?t?!0:{force:!0}:t.length>0}},elements:{productName:["required:true"],owner:["required:true"],ownerPhone:["required:true",{phone:function(e){return/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(e)}}],ownerMail:["required::true",{email:function(e){return/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(e)}}]},notifier:{"*":function(e,t,n){e?$(this).next().html(""):$(this).next().html(o[n][t])}}});t.init=function(){var e=this.element;if(i)n.getProduct({id:i}).done(function(t){if(t.status===200){var n=t.data,r=Simplite.render("product-add-product-form",n);e.html(r),u.init(e)}else console.log("获取业务线表单数据出错",t)});else{var t=Simplite.render("product-add-product-form",{});e.html(t),u.init(e)}e.on("click",".product-save",function(){u.validate().done(function(t){t&&n.saveProduct(s(e)).done(function(e){e.status===200?window.location.href=window.rootBase+"/product/list":console.log("保存业务线数据出错",e)})})}).on("click",".cancel-save",function(){window.location.href=window.rootBase+"/product/list"})}}),Simplite.compiles["product-add-product-form"]=function(e){return function(e){"use strict";var t=this,n='<form class="form-horizontal"><div class="form-group"><label for="product-name" class="col-sm-2 control-label">业务线名称</label><div class="col-sm-10"><input type="text" class="form-control" id="product-name" placeholder="请输入业务线名称" value="'+t.defaultAttr(e.productName)+'" name="productName" data-validate-name="productName" maxlength="40"><div class="validator-error"></div></div></div><div class="form-group"><label for="owner" class="col-sm-2 control-label">接口人</label><div class="col-sm-10"><input type="text" class="form-control" id="owner" placeholder="请输入接口人姓名" value="'+t.defaultAttr(e.owner)+'" name="owner" data-validate-name="owner" maxlength="40"><div class="validator-error"></div></div></div><div class="form-group"><label for="owner-phone" class="col-sm-2 control-label">手机号</label><div class="col-sm-10"><input type="text" class="form-control" id="owner-phone" placeholder="请输入接口人手机" value="'+t.defaultAttr(e.ownerPhone)+'" name="ownerPhone" data-validate-name="ownerPhone" maxlength="20"><div class="validator-error"></div></div></div><div class="form-group"><label for="owner-email" class="col-sm-2 control-label">邮箱</label><div class="col-sm-10"><input type="text" class="form-control" id="owner-email" placeholder="请输入接口人邮箱" value="'+t.defaultAttr(e.ownerMail)+'" name="ownerMail" data-validate-name="ownerMail" maxlength="100"><div class="validator-error"></div></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="button" class="btn btn-primary product-save" name="productId" value="'+t.defaultAttr(e.productId)+'">确定</button><button type="button" class="col-sm-offset-1 btn btn-default cancel-save">取消</button></div></div></form> ';return n}.call(Simplite,e)},define("product-add/main",["require","exports","module","./product-form"],function(e,t){e("./product-form"),t.init=function(){}});
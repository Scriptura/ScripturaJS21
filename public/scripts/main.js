"use strict";const jsDetect=(()=>document.documentElement.classList.replace("no-js","js"))(),touchDetect=(()=>{const t=document.documentElement;"ontouchstart"in window||navigator.msMaxTouchPoints?t.classList.add("touch"):t.classList.add("no-touch")})(),getScript=(t,e="footer")=>new Promise((o,c)=>{const n=document.createElement("script");n.src=t,n.async=1,n.onerror=c,n.onload=n.onreadystatechange=function(){const t=this.readyState;t&&"loaded"!==t&&"complete"!==t||(n.onload=n.onreadystatechange=null,o())},"head"==e?document.head.appendChild(n):"footer"==e?document.body.appendChild(n):console.log("Error: the choice of the html tag for the hook is not correct.")}),getScripts=(document.querySelector("[class*=validation]")&&getScript("/scripts/formValidation.js"),document.querySelector("[class*=-focus]")&&getScript("/scripts/imageFocus.js"),document.querySelector("[class*=accordion]")&&getScript("/scripts/accordion.js"),document.querySelector("[class*=tabs]")&&getScript("/scripts/tab.js"),document.querySelector("[class*=pre]")&&getScript("/scripts/codeBlock.js"),document.querySelector(".input [type=password]")&&getScript("/scripts/readablePassword.js"),document.querySelector("[class*=add-line-marks]")&&getScript("/scripts/lineMark.js"),document.querySelector("[class*=map]")&&getScript("/scripts/map.js"),void(document.querySelector("[class*=thumbnail-youtube]")&&getScript("/scripts/youtubeVideo.js"))),fadeOut=(t,e)=>{t.style.opacity=1(function o(){(t.style.opacity-=30/e)<0?(t.style.opacity=0,t.style.display="none"):requestAnimationFrame(o)})()},fadeIn=(t,e)=>{t.style.opacity=0,t.style.display="block"(function o(){let c=parseFloat(t.style.opacity);(c+=30/e)>1||(t.style.opacity=c,requestAnimationFrame(o)),c>.99&&(t.style.opacity=1)})()},injectSvgSprite=(t,e,o)=>{void 0===o&&(o="utils");const c=`<svg role="img" focusable="false"><use xlink:href="${"/medias/sprites/"+o}.svg#${e}"></use></svg>`;t.insertAdjacentHTML("beforeEnd",c)},externalLinks=void document.querySelectorAll("a").forEach(t=>{t.hostname!==window.location.hostname&&t.setAttribute("target","_blank")}),cmdPrint=(()=>{const t=document.querySelectorAll(".cmd-print"),e=()=>window.print();for(const o of t)o.onclick=e})(),dateInputToday=void document.querySelectorAll('input[type="date"].today-date').forEach(t=>t.valueAsDate=new Date),multipleSelectCustom=void document.querySelectorAll(".input select[multiple]").forEach(t=>{const e=t.length;e<7?(t.size=e,t.style.overflow="hidden"):t.size=7}),rangeInput=void document.querySelectorAll(".range").forEach(t=>{const e=t.querySelector("input"),o=t.querySelector("output");o.textContent=e.value,e.oninput=function(){o.textContent=this.value}}),colorInput=void document.querySelectorAll(".color-output input").forEach(t=>{const e=document.createElement("output");t.after(e),t.parentElement.querySelector("output"),e.textContent=t.value,t.oninput=function(){this.value=this.value,e.textContent=this.value}}),scrollToTop=(()=>{const t=document.querySelector(".footer"),e=document.createElement("button");e.type="button",e.classList.add("scroll-top"),e.setAttribute("aria-label","Scroll to top"),injectSvgSprite(e,"arrow-up"),t.appendChild(e);const o=document.querySelector(".scroll-top");o.classList.add("hide");window.addEventListener("scroll",()=>{const t=window.innerHeight/2;window.scrollY>t?o.classList.remove("hide"):o.classList.add("hide")});o.addEventListener("click",()=>{window.scrollTo({top:0})},!1)})(),mainMenu=(()=>{const t=document.querySelector(".cmd-nav"),e=document.querySelector(".main-nav");t.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active")})})(),addDropCap=void document.querySelectorAll(".add-drop-cap > p:first-child").forEach(t=>t.innerHTML=t.innerHTML.replace(/^(\w)/,'<span class="drop-cap">$1</span>')),secondsToTime=t=>{let e=Math.floor(t/3600).toString().padStart(2,"0"),o=Math.floor(t%3600/60).toString().padStart(2,"0"),c=Math.floor(t%60).toString().padStart(2,"0");return"00"==e&&(e=null),[e,o,c].filter(Boolean).join(":")},audioPlayer=(()=>{const t=document.querySelectorAll(".audio"),e=(t,e)=>{document.querySelector(".audio-player-duration").value=secondsToTime(t.duration)};(()=>{let o=0;for(const c of t){const t=`<div class="audio-player"><button class="audio-play-pause"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M204.524 102.03L819.48 512 204.523 921.97z"/></svg></button><output class="audio-player-current-time">0:00</output><div class="progress"></div><output class="audio-player-duration">0:00</output><div><button onclick="document.document.getElementById('audio-player${++o}')[0].volume += 0.1">+</button><button onclick="document.getElementById('audio-player${o}')[0].volume -= 0.1">-</button></div></div>`;c.id="audio-player"+o,c.insertAdjacentHTML("afterend",t),c.addEventListener("loadedmetadata",e(c))}})()})(),progressBar=void document.querySelectorAll(".progress-bar").forEach(t=>{t.insertAdjacentHTML("afterbegin","<div></div>"),t.querySelector("div").style.width=t.dataset.value+"%"});
/*
 * SteamDiesel MK-V // Living Phonograph 0.2.0
 * Uses Spicetify.Player APIs only; never intercepts the audio stream.
 */
(() => {
  "use strict";
  const ID = "sd-mkv-chronograph";
  const STYLE = "sd-mkv-chronograph-style";
  const EVENTS = ["songchange", "onprogress", "onplaypause"];
  let mounted = false;
  let observer;
  let queued = false;
  const css = `
    :root{--sd-c:var(--spice-button,#D4882A);--sd-h:var(--spice-button-active,#F5AA3D);--sd-t:var(--spice-text,#EBE0CA);--sd-m:var(--spice-subtext,#B5A488);--sd-p:var(--spice-main-elevated,#1C1510)}
    .Root__now-playing-bar{position:relative}
    #${ID}{position:absolute;z-index:20;right:clamp(250px,31vw,470px);top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:9px;min-width:218px;max-width:330px;padding:7px 10px;background:linear-gradient(145deg,color-mix(in srgb,var(--sd-p) 96%,var(--sd-c) 4%),var(--spice-player,#100C09));border:1px solid color-mix(in srgb,var(--sd-c) 72%,#17110b);border-radius:4px;box-shadow:inset 0 1px 0 color-mix(in srgb,var(--sd-h) 22%,transparent),0 3px 12px #0009;color:var(--sd-t);font:10px/1.2 'IBM Plex Mono','Courier New',monospace}
    #${ID} *{box-sizing:border-box}
    #${ID} .brand{display:flex;flex-direction:column;gap:3px;min-width:0;flex:1}
    #${ID} .kicker{font-size:8px;letter-spacing:.16em;color:var(--sd-h);white-space:nowrap}
    #${ID} .track{font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #${ID} .artist{font-size:9px;color:var(--sd-m);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #${ID} .nixie{padding:5px 6px;background:linear-gradient(#090807,#1b100b);border:1px solid var(--sd-c);border-radius:3px;box-shadow:inset 0 0 8px #000,0 0 7px color-mix(in srgb,var(--sd-h) 18%,transparent);font:700 15px/1 'Courier New',monospace;color:var(--sd-h);text-shadow:0 0 6px var(--sd-c);font-variant-numeric:tabular-nums}
    #${ID} .nixie small{font-size:8px;color:var(--sd-c);text-shadow:none}
    #${ID} .controls{display:flex;gap:3px}
    #${ID} button{display:grid;place-items:center;width:23px;height:25px;padding:0;border:1px solid color-mix(in srgb,var(--sd-c) 65%,#17110b);border-radius:3px;background:linear-gradient(var(--spice-highlight-elevated),var(--spice-main));color:var(--sd-h);cursor:pointer}
    #${ID} button:hover{border-color:var(--sd-h);filter:brightness(1.15)}
    #${ID} button:focus-visible{outline:2px solid var(--sd-h);outline-offset:2px}
    #${ID} .meter{position:absolute;left:8px;right:8px;bottom:2px;height:2px;background:color-mix(in srgb,var(--sd-c) 24%,#080706);overflow:hidden}
    #${ID} .meter span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--sd-c),var(--sd-h));transition:width .18s linear}
    @media(max-width:1100px){#${ID}{right:27vw;min-width:190px;max-width:245px}#${ID} .artist{display:none}}
    @media(max-width:850px){#${ID}{display:none}}
    @media(prefers-reduced-motion:reduce){#${ID} *{transition:none!important}}
  `;
  const fmt = ms => { const s=Math.max(0,Math.floor((Number(ms)||0)/1000)); return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
  const safe = (v,f) => typeof v==="string"&&v.trim()?v.trim():f;
  function trackInfo(){
    const d=Spicetify.Player.data||{}, item=d.item||d.track||d, m=item.metadata||{};
    const artists=item.artists||m.artist_name||m.artist||"";
    const artist=Array.isArray(artists)?artists.map(a=>typeof a==="string"?a:a.name).filter(Boolean).join(", "):artists;
    const title=safe(item.name||item.title||m.title,"Ожидание сигнала");
    const who=safe(artist,"Нет активной записи"), uri=item.uri||m.uri||"";
    return {title,artist:who,uri,key:uri+"|"+title+"|"+who};
  }
  function mount(){
    const bar=document.querySelector(".Root__now-playing-bar")||document.querySelector('[data-testid="now-playing-bar"]');
    if(!bar||!Spicetify.Player)return false;
    if(!document.getElementById(STYLE)){const st=document.createElement("style");st.id=STYLE;st.textContent=css;document.head.appendChild(st);}
    let root=document.getElementById(ID);
    if(root&&root.parentElement!==bar){root.remove();root=null;}
    if(!root){
      root=document.createElement("section");root.id=ID;root.setAttribute("aria-label","SteamDiesel Acoustic Chronograph");
      root.innerHTML='<div class="brand"><span class="kicker">STEAMDIESEL // ИН-14</span><span class="track" data-track>Ожидание сигнала</span><span class="artist" data-artist>Нет активной записи</span></div><div class="nixie" role="timer" aria-live="off"><span data-time>00:00</span><small> MIN</small></div><div class="controls"><button data-a="back" aria-label="Предыдущий трек">|◀</button><button data-a="toggle" aria-label="Воспроизвести или пауза">▶</button><button data-a="next" aria-label="Следующий трек">▶|</button></div><div class="meter"><span data-meter></span></div>';
      root.addEventListener("click",e=>{const b=e.target.closest("button[data-a]");if(!b)return;try{if(b.dataset.a==="back")Spicetify.Player.back();if(b.dataset.a==="next")Spicetify.Player.next();if(b.dataset.a==="toggle")Spicetify.Player.togglePlay();}catch(err){console.warn("[SteamDiesel] Player action failed",err);}});
      bar.appendChild(root);
    }
    if(!mounted){EVENTS.forEach(n=>Spicetify.Player.addEventListener(n,schedule));mounted=true;}
    update();return true;
  }
  function update(){
    queued=false;const root=document.getElementById(ID);if(!root)return;
    const p=Spicetify.Player,t=trackInfo(),duration=Math.max(0,Number(p.getDuration?.())||0),progress=Math.max(0,Number(p.getProgress?.())||0),playing=!!p.isPlaying?.();
    root.querySelector("[data-track]").textContent=t.title;root.querySelector("[data-artist]").textContent=t.artist;
    root.querySelector("[data-time]").textContent=fmt(progress);
    root.querySelector("[data-meter]").style.width=(duration?Math.min(100,progress/duration*100):0)+"%";
    root.dataset.state=t.uri?(playing?"playing":"paused"):"idle";
    const toggle=root.querySelector('[data-a="toggle"]');toggle.textContent=playing?"Ⅱ":"▶";toggle.setAttribute("aria-label",playing?"Приостановить":"Воспроизвести");
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(update);}
  function init(){
    if(mount())return;
    observer=new MutationObserver(()=>{if(mount()&&observer){observer.disconnect();observer=null;}});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    let n=0;const retry=()=>{if(mount())return;if(++n<60)setTimeout(retry,250);};retry();
  }
  init();console.info("[SteamDiesel MK-V] Living Phonograph 0.2.0 loaded");
})();
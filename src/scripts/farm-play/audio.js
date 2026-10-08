// Original procedural sine-tone effects and pentatonic instrumental, authored for this project.
// No samples, recordings, external media, or licensed third-party composition.
const instances=new WeakMap();
const preferenceKey='hien-nuong-farm-play-audio-v1';
export function initAudio() {
 const root=document.querySelector('[data-play-audio]');if(!root)return {play:()=>{}};if(instances.has(root))return instances.get(root);
 const soundButton=root.querySelector('[data-sound-toggle]'),musicButton=root.querySelector('[data-music-toggle]'),status=root.querySelector('[data-audio-status]');
 let preferences={sound:false,music:false};try{const saved=JSON.parse(localStorage.getItem(preferenceKey));if(saved)preferences={sound:saved.sound===true,music:saved.music===true};}catch{}
 let context, soundArmed=false,musicArmed=false,busy=false,destroyed=false,musicTimer,lastCue=-Infinity,lastKind,activeEffect=[];const musicNodes=new Set();let phrase=0;let suspension=Promise.resolve();
 const save=()=>{try{localStorage.setItem(preferenceKey,JSON.stringify(preferences));}catch{}};
 function render() {
  soundButton.setAttribute('aria-pressed',String(preferences.sound));musicButton.setAttribute('aria-pressed',String(preferences.music));
  soundButton.textContent='Âm thanh: '+(preferences.sound?(soundArmed?'Bật':'Bật · chạm để phát'):'Tắt');
  musicButton.textContent='Nhạc nền: '+(preferences.music?(musicArmed?'Bật':'Bật · chạm để phát'):'Tắt');
  soundButton.disabled=busy;musicButton.disabled=busy;
 }
 if(preferences.sound||preferences.music)status.textContent='Đã nhớ lựa chọn của bạn. Bấm từng nút âm thanh để cho phép phát trong lần ghé này.';
 async function activate() {
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('unsupported');
  context??=new Audio();if(context.state!=='running')await context.resume();if(destroyed||context.state!=='running')throw new Error('blocked');
 }
 function stopNodes(nodes) {for(const node of nodes){try{node.stop();}catch{}try{node.disconnect();}catch{}}}
 function stopMusic() {clearInterval(musicTimer);musicTimer=undefined;stopNodes(musicNodes);musicNodes.clear();}
 function tone(frequency,start,duration,volume,nodes) {
  const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;
  gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+Math.min(.08,duration/4));gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
  oscillator.connect(gain);gain.connect(context.destination);oscillator.start(start);oscillator.stop(start+duration+.03);nodes.add?.(oscillator);if(Array.isArray(nodes))nodes.push(oscillator);
  oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();nodes.delete?.(oscillator);};
 }
 function musicPhrase() {
  if(!context||context.state!=='running'||document.hidden||destroyed)return;
  const notes=[[196,246.94,293.66],[220,261.63,329.63],[196,246.94,293.66],[174.61,220,261.63]][phrase++%4];const start=context.currentTime+.02;
  notes.forEach((frequency,i)=>tone(frequency,start+i*.9,4.7,.009,musicNodes));
 }
 function startMusic() {stopMusic();if(!musicArmed||!preferences.music||document.hidden)return;musicPhrase();musicTimer=setInterval(musicPhrase,6000);}
 function play(kind='select') {
  if(!preferences.sound||!soundArmed||!context||context.state!=='running'||document.hidden||destroyed)return;
  const now=performance.now();if(now-lastCue<180&&(kind===lastKind||kind==='select'))return;lastCue=now;lastKind=kind;stopNodes(activeEffect);activeEffect=[];
  const cues={select:[330],place:[392,494],correct:[392,523],neutral:[294],reveal:[349,440],complete:[392,494,587]};const notes=cues[kind]||cues.select;
  notes.forEach((frequency,i)=>tone(frequency,context.currentTime+.01+i*.11,.24,.035,activeEffect));
 }
 async function toggle(kind) {
  if(busy||destroyed)return;busy=true;render();
  try {
   const armed=kind==='sound'?soundArmed:musicArmed;
   if(preferences[kind]&&armed){preferences[kind]=false;if(kind==='sound'){soundArmed=false;stopNodes(activeEffect);activeEffect=[];}else{musicArmed=false;stopMusic();}status.textContent=(kind==='sound'?'Âm thanh':'Nhạc nền')+' đã tắt.';}
   else {await activate();preferences[kind]=true;if(kind==='sound'){soundArmed=true;play('select');}else{musicArmed=true;startMusic();}status.textContent=(kind==='sound'?'Âm thanh':'Nhạc nền')+' đã bật. Bạn có thể tắt bất cứ lúc nào.';}
   save();
  }catch{if(kind==='sound')soundArmed=false;else{musicArmed=false;stopMusic();}status.textContent='Trình duyệt chưa cho phép phát âm thanh. Bạn có thể bấm nút để thử lại; trò chơi vẫn hoạt động bình thường.';}
  finally{busy=false;render();}
 }
 const onSound=()=>toggle('sound'),onMusic=()=>toggle('music');
 async function visibility() {if(document.hidden){stopMusic();stopNodes(activeEffect);activeEffect=[];if(context?.state==='running'){suspension=context.suspend().catch(()=>{});await suspension;}}else if(!destroyed&&(soundArmed||musicArmed)){try{await suspension;if(document.hidden||destroyed)return;await activate();startMusic();}catch{status.textContent='Âm thanh đang tạm dừng. Tắt rồi bật lại để tiếp tục phát.';}}}
 function destroy() {if(destroyed)return;destroyed=true;stopMusic();stopNodes(activeEffect);context?.close().catch(()=>{});document.removeEventListener('visibilitychange',visibility);document.removeEventListener('astro:before-swap',destroy);soundButton.removeEventListener('click',onSound);musicButton.removeEventListener('click',onMusic);}
 // pagehide cleans up even for the back-forward cache; pageshow rebinds without autoplay.
 function onPageHide(){destroy();instances.delete(root);window.removeEventListener('pagehide',onPageHide);}
 window.addEventListener('pagehide',onPageHide,{once:true});document.addEventListener('astro:before-swap',destroy,{once:true});
 function onPageShow(event){if(event.persisted&&document.contains(root)){window.removeEventListener('pageshow',onPageShow);initAudio();}}
 window.addEventListener('pageshow',onPageShow);
 document.addEventListener('visibilitychange',visibility);soundButton.addEventListener('click',onSound);musicButton.addEventListener('click',onMusic);
 const api={play:kind=>{if(destroyed)instances.get(root)?.play(kind);else play(kind);}};instances.set(root,api);render();return api;
}

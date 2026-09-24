(function(){
  var root=document.documentElement,btn=document.getElementById('theme');
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  var pref=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  function setTheme(t){root.setAttribute('data-theme',t);btn.innerHTML='<i class="fa-solid fa-'+(t==='dark'?'sun':'moon')+'"></i>';try{localStorage.setItem('theme',t)}catch(e){}}
  setTheme(pref);
  btn.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark')});

  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});

  document.getElementById('yr').textContent=new Date().getFullYear();
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function count(el){
    var to=+el.dataset.to,suf=el.dataset.suffix||'',t0=null,d=1600;
    if(reduce){el.textContent=to+suf;return}
    requestAnimationFrame(function step(t){t0=t0||t;var p=Math.min((t-t0)/d,1);el.textContent=Math.floor(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(step)});
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      if(e.target.classList.contains('count'))count(e.target);
      e.target.classList.add('in');io.unobserve(e.target)})},{threshold:.3});
    document.querySelectorAll('.count').forEach(function(n){io.observe(n)});
    document.querySelectorAll('.timeline>li').forEach(function(n){n.classList.add('reveal');io.observe(n)});
  }
})();

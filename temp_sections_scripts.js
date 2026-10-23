<script>
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal (for elements added in these sections) */
  var rev=document.querySelectorAll('#case-studies .abx-reveal,#awards .abx-reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}})},{threshold:.12});
    rev.forEach(function(el){
      var p=el.parentElement,idx=(p.classList.contains('abx-cs-grid')||p.classList.contains('abx-aw-grid'))?Array.prototype.indexOf.call(p.children,el):0;
      el.style.transitionDelay=(idx*80)+'ms';io.observe(el);
    });
  } else rev.forEach(function(el){el.classList.add('is-in')});

  /* Modal helpers: move dialogs to <body> so they sit above the fixed header */
  document.querySelectorAll('#case-studies .abx-modal,#awards .abx-modal').forEach(function(m){document.body.appendChild(m);});
  var lastFocus=null;
  function openModal(m){lastFocus=document.activeElement;m.hidden=false;document.body.classList.add('abx-lock');var c=m.querySelector('.abx-modal-close');if(c)c.focus();}
  function closeModal(m){m.hidden=true;document.body.classList.remove('abx-lock');if(lastFocus)lastFocus.focus();}
  document.querySelectorAll('.abx-modal').forEach(function(m){
    m.addEventListener('click',function(e){if(e.target.closest('[data-close]'))closeModal(m);});
    m.addEventListener('keydown',function(e){
      if(e.key==='Escape')closeModal(m);
      if(e.key==='Tab'){var f=m.querySelectorAll('button,a[href]');if(!f.length)return;var a=f[0],z=f[f.length-1];
        if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}
    });
  });

  /* Case studies: filter */
  var cards=[].slice.call(document.querySelectorAll('.abx-cs-card'));
  document.querySelectorAll('.abx-filter').forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.dataset.filter;
      document.querySelectorAll('.abx-filter').forEach(function(x){var on=x===b;x.classList.toggle('is-active',on);x.setAttribute('aria-pressed',on);});
      var cta=document.querySelector('.abx-cs-cta');if(cta)cta.style.display=f==='all'?'':'none';
      cards.forEach(function(c){
        var show=f==='all'||c.dataset.cat.split(' ').indexOf(f)>-1;
        c.classList.toggle('is-hidden',!show);
        c.classList.toggle('is-featured',show&&f==='all'&&c===cards[0]);
        if(show&&!reduce){c.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:400,easing:'ease-out'});}
      });
    });
  });

  /* Case studies: modal */
  var modal=document.getElementById('abx-cs-modal'),cur=0;
  function visible(){return cards.filter(function(c){return !c.classList.contains('is-hidden')});}
  function fill(card){
    var v=visible();cur=v.indexOf(card);
    var img=card.querySelector('.abx-cs-media img'),media=modal.querySelector('.abx-m-media');
    media.classList.toggle('is-logo',card.querySelector('.abx-cs-media').classList.contains('abx-cs-media-logo'));
    media.querySelector('img').src=img.src;media.querySelector('img').alt=img.alt;
    media.querySelector('.abx-cs-tag').textContent=card.querySelector('.abx-cs-tag').textContent;
    modal.querySelector('.abx-m-loc').innerHTML=card.querySelector('.abx-cs-loc').innerHTML;
    modal.querySelector('.abx-m-title').textContent=card.querySelector('.abx-cs-title').textContent;
    modal.querySelector('.abx-m-year').textContent=card.querySelector('.abx-cs-year').textContent;
    modal.querySelector('.abx-m-stats').innerHTML=card.querySelector('.abx-cs-stats').innerHTML;
    modal.querySelector('.abx-m-detail').innerHTML=card.querySelector('.abx-cs-detail').innerHTML;
    modal.querySelector('.abx-m-count').innerHTML='<b>'+(cur+1)+'</b> / '+v.length;
    var box=modal.querySelector('.abx-modal-box');box.scrollTop=0;
    if(!reduce)box.querySelector('.abx-m-body').animate([{opacity:0,transform:'translateX(12px)'},{opacity:1,transform:'none'}],{duration:350,easing:'ease-out'});
  }
  cards.forEach(function(c){
    c.addEventListener('click',function(){fill(c);openModal(modal);});
    c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fill(c);openModal(modal);}});
  });
  modal.querySelectorAll('[data-step]').forEach(function(b){
    b.addEventListener('click',function(){var v=visible();fill(v[(cur+parseInt(b.dataset.step,10)+v.length)%v.length]);});
  });
  modal.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var v=visible();fill(v[(cur+(e.key==='ArrowRight'?1:-1)+v.length)%v.length]);}
  });

  /* Awards: counters */
  var nums=document.querySelectorAll('#awards [data-count]');
  function run(el){var t=+el.dataset.count;if(reduce){el.textContent=t;return;}var s=null;
    function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/1600,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e);if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);}
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);co.unobserve(e.target);}})},{threshold:.6});
    nums.forEach(function(n){co.observe(n)});
  } else nums.forEach(run);

  /* Awards: subtle 3D tilt */
  if(!reduce&&window.matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.abx-award').forEach(function(a){
      a.addEventListener('pointermove',function(e){var r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        a.style.transform='perspective(900px) rotateX('+(-y*6)+'deg) rotateY('+(x*6)+'deg) translateY(-4px)';});
      a.addEventListener('pointerleave',function(){a.style.transform='';});
    });
  }

  /* Awards: lightbox */
  var lb=document.getElementById('abx-aw-lightbox');
  document.querySelectorAll('.abx-award').forEach(function(a){
    a.addEventListener('click',function(){
      lb.querySelector('img').src=a.dataset.full;lb.querySelector('img').alt=a.querySelector('img').alt;
      lb.querySelector('figcaption').textContent=a.dataset.caption;openModal(lb);
    });
  });

  /* Marquee: duplicate the list for a seamless loop */
  var tr=document.querySelector('.abx-marquee-track');
  if(tr){[].slice.call(tr.children).forEach(function(s){var c=s.cloneNode(true);c.setAttribute('aria-hidden','true');tr.appendChild(c);});}
})();
</script>
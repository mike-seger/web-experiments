var menu = document.getElementById('menu'),
    code = document.getElementById('code'),
    seg = document.getElementById('seg'),
    stage = document.getElementById('stage'),
    pause = document.getElementById('pause');

var modes = {
  normal:
'.menu a {\n' +
'  color: #fff;\n' +
'  /* no blending — invisible on white */\n' +
'}',
  difference:
'.menu a {\n' +
'  position: relative;\n' +
'  unicode-bidi: isolate;\n' +
'  text-align: left;\n' +
'  padding-left: 15px;\n' +
'  font-family: \'Inter Tight\', sans-serif;\n' +
'  font-weight: 600;   /* SemiBold */\n' +
'  color: #fff;\n' +
'  mix-blend-mode: difference;\n' +
'}',
  exclusion:
'.menu a {\n' +
'  color: #fff;\n' +
'  mix-blend-mode: exclusion; /* softer inversion */\n' +
'}'
};

function setMode(m) {
  Array.prototype.forEach.call(menu.children, function (a) {
    a.style.mixBlendMode = m;
  });
  code.textContent = modes[m];
  Array.prototype.forEach.call(seg.querySelectorAll('[data-m]'), function (b) {
    var on = b.dataset.m === m;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
}

seg.addEventListener('click', function (e) {
  if (e.target.dataset.m) setMode(e.target.dataset.m);
});

pause.addEventListener('click', function () {
  var paused = stage.classList.toggle('paused');
  pause.textContent = paused ? 'Resume loop' : 'Pause loop';
});

setMode('difference');

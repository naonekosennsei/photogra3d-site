'use strict';
// An advertised introductory offer ends at midnight after December 10 in Japan.
// This updates the presentation only; checkout pricing is managed by Lemon Squeezy.
if (Date.now() >= Date.parse('2026-12-11T00:00:00+09:00')) {
  document.querySelector('#intro-offer').hidden = true;
  document.querySelector('#regular-offer').hidden = false;
}
const video = document.querySelector('#tutorial-player');
const start = document.querySelector('#video-start');
const chapters = Array.from(document.querySelectorAll('.chapter'));
const title = document.querySelector('#video-title');
const number = document.querySelector('#video-number');
const direct = document.querySelector('#video-direct');
const status = document.querySelector('#player-status');
let active = chapters[0];
function chooseChapter(button, play = true) {
  active = button;
  chapters.forEach(item => item.setAttribute('aria-current', String(item === button)));
  title.textContent = button.dataset.title;
  number.textContent = button.dataset.number;
  video.setAttribute('aria-label', button.dataset.title);
  direct.href = button.dataset.src;
  video.pause();
  video.src = button.dataset.src;
  start.hidden = true;
  status.textContent = '字幕付き・音声なし。全画面表示でもご覧いただけます。';
  video.load();
  if (play) video.play().catch(() => {
    status.textContent = 'プレイヤーの再生ボタンを押してください。再生できない場合は「動画を開く」からご覧いただけます。';
  });
}
start.addEventListener('click', () => chooseChapter(active));
chapters.forEach(button => button.addEventListener('click', () => {
  chooseChapter(button);
  if (window.matchMedia('(max-width:760px)').matches) {
    document.querySelector('.player-frame').scrollIntoView({block: 'start', behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth'});
  }
}));
video.addEventListener('error', () => {
  status.textContent = '動画を読み込めませんでした。通信状態をご確認いただくか、「動画を開く」から再生してください。';
});

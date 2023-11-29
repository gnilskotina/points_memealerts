let socket = new WebSocket("ws://localhost:8765");

let memeList = [];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function deleteMeme(e) {
  e.target.remove();
  text = document.getElementById('user');
  text.remove(); 
}

function showMeme(data){
  var meme = document.createElement('video');
  meme.id = 'meme';
  meme.src = data['url'];
  meme.autoplay = true;
  var user = document.createElement('div');
  user.id = 'user';
  user.innerText = data['name'];
  user.style.width = 'fit-content';
  user.style.display = 'flex';
  user.style.margin = '0 auto';
  user.style.marginTop = '15px'
  user.style.color = 'white';
  user.style.textShadow = '3px 3px 4px #983131, 0 0 3em #2c2c85, 0 0 0.2em #373776';
  meme.style.position = 'absolute';
  meme.addEventListener('loadedmetadata', function(e){
    const maxH = screen.height - meme.videoHeight;
    const maxW = screen.width - meme.videoWidth;
    meme.style.top = `${randomInteger(0,maxH)}px`;
    meme.style.left = `${randomInteger(0,maxW)}px`;
});
  document.body.appendChild(meme);
  document.body.appendChild(user);
  meme.addEventListener('ended', deleteMeme, false);
}

socket.onopen = function(e) {
  console.log('connect!');
};

socket.onmessage = function(event) {
  data = JSON.parse(event.data);
  var u = new URL(data['url'])
  if (u.hostname == 'cdn.memealerts.com'){
    memeList.push(data);
    console.log('+meme');
    showMeme(data);
  }
  console.log(data);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] ${event.code} ${event.reason}`);
  } else {
    alert('[close]');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error}`);
};


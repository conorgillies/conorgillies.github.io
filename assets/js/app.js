var MAX_CHANNELS = 10;

// create an array of Audio objects of length MAX_CHANNELS
var audioChannels = Array.apply(null, new Array(MAX_CHANNELS)).map(function () {return new Audio(); });

var audioMap = {
  t: 'tngbridge'
};

function keyHandler (e) {
  var id = audioMap[String.fromCharCode(e.keyCode).toLowerCase()];
  id && playSound(id);
}

function playSound(id) {
  var audioChannel = audioChannels.filter(function(audioChannel) {
    return audioChannel.finished === undefined || audioChannel.finished < +new Date();
  })[0];

  if (!audioChannel) return;

  var audioElement = document.getElementById(id);
  audioChannel.src = audioElement.src;
  audioChannel.load();
  audioChannel.finished = +new Date() + audioElement.duration*1000;
  audioChannel.play();
}

window.onload = function() {
  addEventListener('keydown', keyHandler);

  var samplesEl = document.querySelector('.samples');
  Object.keys(audioMap).forEach(function(key) {
    var sampleEl = document.createElement('li');
    sampleEl.textContent = key + " = " + audioMap[key];
    samplesEl.appendChild(sampleEl);
  });
};
